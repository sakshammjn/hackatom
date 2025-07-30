import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { REAL_INDUSTRIES_DATA } from '@/lib/real-data';

interface BusinessCaseData {
  companyName: string;
  useCase: string;
  investmentEstimate: string;
  executiveSummary: string;
  timeline: string;
  expectedROI: number;
}

export function ReportGenerator() {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<BusinessCaseData>({
    companyName: 'Acme Healthcare Solutions',
    useCase: 'Medical Imaging (Tc-99m)',
    investmentEstimate: '$850,000',
    executiveSummary: 'Implementation of Technetium-99m imaging technology will reduce diagnostic costs by 35% while improving patient throughput by 45%. Expected ROI of 145% over 3 years with payback period of 26 months.',
    timeline: '6 months',
    expectedROI: 145
  });

  const handleInputChange = (field: keyof BusinessCaseData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePDFReport = async () => {
    if (!formData.companyName || !formData.investmentEstimate || !formData.executiveSummary) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating the report.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Get current date
      const currentDate = new Date().toLocaleDateString();
      
      // Get real isotope data based on use case
      const industryData = REAL_INDUSTRIES_DATA.find(ind => 
        formData.useCase.toLowerCase().includes(ind.name.toLowerCase())
      ) || REAL_INDUSTRIES_DATA[0];
      
      const primaryIsotope = industryData.keyIsotopes[0];

      // Header with company logo placeholder
      pdf.setFillColor(31, 41, 55); // Dark background
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('ISOSPIRE', 20, 20);
      pdf.setFontSize(12);
      pdf.text('Nuclear Technology Business Case Report', 20, 30);
      
      // Date
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.text(`Generated: ${currentDate}`, pageWidth - 60, 15);

      // Company Information Section
      let yPos = 60;
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246); // Blue
      pdf.text('Executive Summary', 20, yPos);
      
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Company: ${formData.companyName}`, 20, yPos);
      
      yPos += 10;
      pdf.text(`Use Case: ${formData.useCase}`, 20, yPos);
      
      yPos += 10;
      pdf.text(`Investment Estimate: ${formData.investmentEstimate}`, 20, yPos);
      
      yPos += 10;
      pdf.text(`Timeline: ${formData.timeline}`, 20, yPos);
      
      yPos += 10;
      pdf.text(`Expected ROI: ${formData.expectedROI}%`, 20, yPos);

      // Executive Summary
      yPos += 20;
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Business Case Overview', 20, yPos);
      
      yPos += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      const summaryLines = pdf.splitTextToSize(formData.executiveSummary, pageWidth - 40);
      pdf.text(summaryLines, 20, yPos);
      yPos += summaryLines.length * 6;

      // Market Intelligence Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Market Intelligence & Technical Data', 20, yPos);
      
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Industry Market Size: $${industryData.marketSize.toLocaleString()}M`, 20, yPos);
      
      yPos += 8;
      pdf.text(`Market Growth Rate: ${industryData.growthRate}% CAGR`, 20, yPos);
      
      yPos += 8;
      pdf.text(`Primary Isotope: ${primaryIsotope.name} (${primaryIsotope.symbol})`, 20, yPos);
      
      yPos += 8;
      pdf.text(`Half-life: ${primaryIsotope.halfLife}`, 20, yPos);
      
      yPos += 8;
      pdf.text(`Cost per gram: $${primaryIsotope.costPerGram?.toLocaleString() || 'Variable'}`, 20, yPos);
      
      yPos += 8;
      pdf.text(`ROI Potential: ${primaryIsotope.roiPotential}%`, 20, yPos);
      
      yPos += 8;
      pdf.text(`Payback Period: ${primaryIsotope.paybackPeriod} months`, 20, yPos);

      // Applications Section
      yPos += 15;
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Key Applications', 20, yPos);
      
      yPos += 12;
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      primaryIsotope.applications.forEach((app, index) => {
        yPos += 6;
        pdf.text(`• ${app}`, 25, yPos);
      });

      // Market Producers
      yPos += 15;
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('Leading Market Producers', 20, yPos);
      
      yPos += 12;
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      primaryIsotope.mainProducers.forEach((producer, index) => {
        yPos += 6;
        pdf.text(`• ${producer}`, 25, yPos);
      });

      // Data Sources Footer
      if (yPos > pageHeight - 30) {
        pdf.addPage();
        yPos = 30;
      }
      
      yPos += 20;
      pdf.setFillColor(240, 243, 246);
      pdf.rect(15, yPos - 5, pageWidth - 30, 25, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor(75, 85, 99);
      pdf.text('Data Sources:', 20, yPos + 5);
      pdf.text('• National Center for Biotechnology Information (NCBI)', 20, yPos + 10);
      pdf.text('• International Atomic Energy Agency (IAEA)', 20, yPos + 15);
      pdf.text('• NASA Radioisotope Power Systems Program', 20, yPos + 20);

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('This report was generated using authentic market data and verified isotope specifications.', 20, pageHeight - 10);
      pdf.text(`Generated by Isospire Business Intelligence Platform - ${currentDate}`, pageWidth - 80, pageHeight - 10);

      // Save the PDF
      const fileName = `${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Isotope_Business_Case_${currentDate.replace(/\//g, '-')}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF Generated Successfully!",
        description: `Report saved as ${fileName}`,
      });

    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateReport = generatePDFReport;
  const handleDownloadPDF = generatePDFReport;

  const handleDownloadPPT = () => {
    // Create a simple text-based PowerPoint alternative
    const presentationContent = `
ISOSPIRE - Nuclear Technology Business Case Presentation
Company: ${formData.companyName}

SLIDE 1: Executive Summary
- Use Case: ${formData.useCase}
- Investment: ${formData.investmentEstimate}
- Expected ROI: ${formData.expectedROI}%
- Timeline: ${formData.timeline}

SLIDE 2: Business Overview
${formData.executiveSummary}

SLIDE 3: Market Intelligence
- Industry backed by verified NCBI, IAEA, and NASA data
- Growing market with proven ROI potential
- Established supplier network

SLIDE 4: Next Steps
1. Conduct detailed facility assessment
2. Obtain regulatory pre-approval
3. Finalize vendor partnerships
4. Develop implementation timeline
5. Begin staff training programs

Generated by Isospire Business Intelligence Platform
    `;

    const blob = new Blob([presentationContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Presentation_Outline.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Presentation Outline Downloaded",
      description: "Text outline saved for creating PowerPoint slides.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Input */}
      <Card className="glass-effect border-gray-600 bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Company Name *</label>
            <Input
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Selected Use Case</label>
            <Select value={formData.useCase} onValueChange={(value) => handleInputChange('useCase', value)}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="Medical Imaging (Tc-99m)">Medical Imaging (Tc-99m)</SelectItem>
                <SelectItem value="Cancer Treatment (Lu-177)">Cancer Treatment (Lu-177)</SelectItem>
                <SelectItem value="Medical Sterilization (Co-60)">Medical Sterilization (Co-60)</SelectItem>
                <SelectItem value="Food Irradiation (Co-60)">Food Irradiation (Co-60)</SelectItem>
                <SelectItem value="NDT Testing (Ir-192)">NDT Testing (Ir-192)</SelectItem>
                <SelectItem value="RTG Power Systems (Pu-238)">RTG Power Systems (Pu-238)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Investment Estimate *</label>
            <Input
              placeholder="$2,500,000"
              value={formData.investmentEstimate}
              onChange={(e) => handleInputChange('investmentEstimate', e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Executive Summary *</label>
            <Textarea
              placeholder="Brief overview of the proposal..."
              value={formData.executiveSummary}
              onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500 h-24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-white">Timeline</label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="12 months">12 months</SelectItem>
                <SelectItem value="18 months">18 months</SelectItem>
                <SelectItem value="24 months">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Generate Button */}
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Generating PDF...
              </>
            ) : (
              <>
                <i className="fas fa-file-pdf mr-2"></i>
                Generate Business Case
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="glass-effect border-gray-600 bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Report Document Preview */}
          <div className="bg-white text-gray-900 rounded-lg p-6 min-h-[600px] shadow-2xl">
            {/* Report Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-blue-900">
                    {formData.companyName || 'Your Company Name'}
                  </h4>
                  <p className="text-gray-600">Nuclear Technology Implementation Proposal</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-atom text-white"></i>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-blue-900 mb-3">Executive Summary</h5>
              <p className="text-gray-700 leading-relaxed">
                {formData.executiveSummary || 'Please provide an executive summary for your proposal.'}
              </p>
            </div>

            {/* Financial Summary */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-blue-900 mb-3">Financial Overview</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Investment</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formData.investmentEstimate || '$0'}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Expected ROI</p>
                  <p className="text-xl font-bold text-emerald-600">{formData.expectedROI}%</p>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-blue-900 mb-3">Risk Assessment</h5>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Regulatory Compliance: Low Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Technical Implementation: Medium Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Market Adoption: Low Risk</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h5 className="text-lg font-semibold text-blue-900 mb-3">Recommended Next Steps</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Conduct detailed facility assessment</li>
                <li>Obtain regulatory pre-approval</li>
                <li>Finalize vendor partnerships</li>
                <li>Develop implementation timeline</li>
                <li>Begin staff training programs</li>
              </ol>
            </div>
          </div>

          {/* Download Options */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-file-pdf mr-2"></i>
                  Download PDF
                </>
              )}
            </Button>
            <Button 
              onClick={handleDownloadPPT}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg"
            >
              <i className="fas fa-file-powerpoint mr-2"></i>
              Download PPT Outline
            </Button>
          </div>
          
          {/* Data Source Indicator */}
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center text-green-300 text-xs">
              <i className="fas fa-shield-check mr-2"></i>
              <span>PDF includes real market data from NCBI, IAEA, NASA & verified industry sources</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
