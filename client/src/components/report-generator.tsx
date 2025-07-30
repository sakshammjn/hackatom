import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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
  const [formData, setFormData] = useState<BusinessCaseData>({
    companyName: '',
    useCase: 'Medical Imaging (Tc-99m)',
    investmentEstimate: '',
    executiveSummary: '',
    timeline: '6 months',
    expectedROI: 145
  });

  const handleInputChange = (field: keyof BusinessCaseData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateReport = () => {
    if (!formData.companyName || !formData.investmentEstimate || !formData.executiveSummary) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating the report.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would generate and download a PDF
    toast({
      title: "Report Generated",
      description: "Your business case report has been generated successfully!",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "PDF report download started. Check your downloads folder.",
    });
  };

  const handleDownloadPPT = () => {
    toast({
      title: "PowerPoint Download",
      description: "PowerPoint presentation download started. Check your downloads folder.",
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
            className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl"
          >
            <i className="fas fa-file-pdf mr-2"></i>
            Generate Business Case
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
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg"
            >
              <i className="fas fa-file-pdf mr-2"></i>
              Download PDF
            </Button>
            <Button 
              onClick={handleDownloadPPT}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg"
            >
              <i className="fas fa-file-powerpoint mr-2"></i>
              Download PPT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
