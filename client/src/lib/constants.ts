export const INDUSTRIES = {
  healthcare: {
    name: "Healthcare",
    icon: "fas fa-heartbeat",
    color: "from-red-500 to-pink-600",
    description: "Medical imaging, cancer treatment, and diagnostic applications using radioisotopes.",
    isotopes: "Tc-99m, I-131, Lu-177",
    useCases: [
      {
        id: "medical-imaging",
        name: "Medical Imaging",
        description: "Enhanced diagnostic capabilities using Tc-99m and other medical isotopes for SPECT imaging.",
        icon: "fas fa-x-ray",
        roi: "High",
        isotope: "Tc-99m",
        color: "from-red-500 to-pink-600"
      },
      {
        id: "cancer-treatment",
        name: "Cancer Treatment",
        description: "Targeted radiotherapy using Lu-177 and I-131 for precise tumor treatment.",
        icon: "fas fa-shield-virus",
        roi: "Very High",
        isotope: "Lu-177",
        color: "from-orange-500 to-red-600"
      },
      {
        id: "sterilization",
        name: "Medical Sterilization",
        description: "Gamma irradiation for medical device and pharmaceutical sterilization.",
        icon: "fas fa-virus-slash",
        roi: "Medium",
        isotope: "Co-60",
        color: "from-blue-500 to-indigo-600"
      }
    ]
  },
  agriculture: {
    name: "Agriculture",
    icon: "fas fa-leaf",
    color: "from-green-500 to-emerald-600",
    description: "Food irradiation, pest control, and plant breeding using nuclear techniques.",
    isotopes: "Co-60, Cs-137, SIT",
    useCases: [
      {
        id: "food-irradiation",
        name: "Food Irradiation",
        description: "Extended shelf life and pathogen elimination using gamma irradiation.",
        icon: "fas fa-apple-alt",
        roi: "High",
        isotope: "Co-60",
        color: "from-green-500 to-emerald-600"
      },
      {
        id: "pest-control",
        name: "Pest Control (SIT)",
        description: "Sterile Insect Technique for sustainable pest population control.",
        icon: "fas fa-bug",
        roi: "Very High",
        isotope: "Cs-137",
        color: "from-yellow-500 to-orange-600"
      },
      {
        id: "plant-breeding",
        name: "Plant Breeding",
        description: "Mutation breeding for improved crop varieties and resistance.",
        icon: "fas fa-seedling",
        roi: "Medium",
        isotope: "Co-60",
        color: "from-green-600 to-teal-600"
      }
    ]
  },
  manufacturing: {
    name: "Manufacturing",
    icon: "fas fa-cogs",
    color: "from-blue-500 to-indigo-600",
    description: "Industrial radiography, quality control, and material testing applications.",
    isotopes: "Ir-192, Se-75, NDT",
    useCases: [
      {
        id: "ndt-testing",
        name: "NDT Testing",
        description: "Non-destructive testing for weld inspection and quality assurance.",
        icon: "fas fa-search",
        roi: "High",
        isotope: "Ir-192",
        color: "from-blue-500 to-indigo-600"
      },
      {
        id: "thickness-gauging",
        name: "Thickness Gauging",
        description: "Precise measurement of material thickness in production lines.",
        icon: "fas fa-ruler",
        roi: "Medium",
        isotope: "Se-75",
        color: "from-purple-500 to-blue-600"
      },
      {
        id: "level-measurement",
        name: "Level Measurement",
        description: "Continuous monitoring of liquid and solid levels in containers.",
        icon: "fas fa-chart-bar",
        roi: "Medium",
        isotope: "Co-60",
        color: "from-indigo-500 to-purple-600"
      }
    ]
  },
  space: {
    name: "Space & R&D",
    icon: "fas fa-rocket",
    color: "from-purple-500 to-violet-600",
    description: "Radioisotope thermoelectric generators and space mission power systems.",
    isotopes: "Pu-238, RTGs, Power",
    useCases: [
      {
        id: "rtg-power",
        name: "RTG Power Systems",
        description: "Radioisotope thermoelectric generators for deep space missions.",
        icon: "fas fa-battery-full",
        roi: "Very High",
        isotope: "Pu-238",
        color: "from-purple-500 to-violet-600"
      },
      {
        id: "satellite-instruments",
        name: "Satellite Instruments",
        description: "Nuclear-powered instruments for space-based research.",
        icon: "fas fa-satellite",
        roi: "High",
        isotope: "Am-241",
        color: "from-violet-500 to-purple-600"
      },
      {
        id: "mars-rovers",
        name: "Mars Rovers",
        description: "Long-duration power systems for planetary exploration vehicles.",
        icon: "fas fa-robot",
        roi: "Very High",
        isotope: "Pu-238",
        color: "from-red-500 to-pink-600"
      }
    ]
  }
};

export const KNOWLEDGE_SECTIONS = [
  {
    id: "isotopes-basics",
    title: "What are Isotopes?",
    subtitle: "Fundamentals of nuclear isotopes and their properties",
    icon: "fas fa-atom",
    color: "bg-blue-500"
  },
  {
    id: "production-methods",
    title: "How Isotopes are Produced",
    subtitle: "Cyclotrons, reactors, and other production methods",
    icon: "fas fa-cogs",
    color: "bg-emerald-500"
  },
  {
    id: "industry-applications",
    title: "Industry Applications",
    subtitle: "Medical, agricultural, industrial, and space applications",
    icon: "fas fa-industry",
    color: "bg-yellow-500"
  },
  {
    id: "safety-regulations",
    title: "Safety & Regulations",
    subtitle: "Compliance requirements and safety protocols",
    icon: "fas fa-shield-alt",
    color: "bg-red-500"
  }
];
