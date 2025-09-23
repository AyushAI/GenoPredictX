"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, Stethoscope, Phone, Shuffle } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"

interface FormData {
  Type: string
  GeneSymbol: string
  HGNC_ID: string
  Assembly: string
  ChromosomeAccession: string
  Chromosome: string
  Cytogenetic: string
  PositionVCF: string
  ReferenceAlleleVCF: string
  AlternateAlleleVCF: string
}

// Disease descriptions dictionary
const diseaseDescriptions: { [key: string]: string } = {
  "Cardiovascular phenotype": "Cardiovascular phenotypes encompass a wide range of heart and blood vessel conditions that can be influenced by genetic variants. These conditions may include arrhythmias, cardiomyopathies, congenital heart defects, and predispositions to coronary artery disease. Genetic variants in genes like SCN10A, DSP, TTN, MYH6, and LMNA can affect heart rhythm, muscle function, and structural integrity. Early detection through genetic testing allows for preventive measures, lifestyle modifications, and targeted therapies to reduce cardiovascular risk.",
  
  "Hereditary cancer-predisposing syndrome": "Hereditary cancer-predisposing syndromes are genetic conditions that significantly increase an individual's risk of developing certain types of cancer. These syndromes are caused by inherited mutations in tumor suppressor genes or DNA repair genes such as BRCA1, BRCA2, TP53, PTEN, and PRKAR1A. Individuals with these genetic variants may have a substantially higher lifetime risk of developing breast, ovarian, colorectal, or other cancers. Genetic counseling, enhanced screening protocols, and preventive surgical options may be recommended based on the specific syndrome identified.",
  
  "Inborn genetic diseases": "Inborn genetic diseases, also known as inherited metabolic disorders or genetic syndromes, are conditions present from birth due to genetic mutations. These disorders can affect various body systems and metabolic pathways, leading to a wide spectrum of symptoms and severity levels. Genes like KRT14, ERCC2, COL7A1, ABCA1, and CFTR when mutated can cause conditions ranging from skin disorders to cystic fibrosis. Early diagnosis through genetic testing enables appropriate management strategies, specialized treatments, and family planning considerations.",
  
  "Fanconi anemia": "Fanconi anemia is a rare inherited disorder characterized by bone marrow failure, increased cancer susceptibility, and various physical abnormalities. It is caused by mutations in genes involved in DNA repair, including FANCA, FANCB, FANCC, FANCD2, and FANCE. Patients typically develop progressive bone marrow failure leading to low blood cell counts, and have an increased risk of developing certain cancers, particularly head and neck squamous cell carcinomas and gynecological cancers. Treatment may include blood transfusions, bone marrow transplantation, and regular cancer surveillance.",
  
  "Developmental and epileptic encephalopathy": "Developmental and epileptic encephalopathy (DEE) represents a group of severe neurological conditions characterized by early-onset epilepsy and developmental delays. These conditions are often caused by mutations in genes crucial for brain development and neuronal function, such as SCN1A, SCN2A, KCNQ2, STXBP1, and CDKL5. Patients typically experience frequent seizures that are difficult to control, along with intellectual disability and developmental regression. Management requires a multidisciplinary approach including anti-epileptic medications, developmental therapies, and ongoing neurological monitoring."
}

// Sample data based on your test examples
const sampleVariants = [
  // Cardiovascular phenotype
  {
    Type: "single nucleotide variant",
    GeneSymbol: "DSP",
    HGNC_ID: "HGNC:3052",
    Assembly: "GRCh37",
    ChromosomeAccession: "NC_000006.11",
    Chromosome: "6",
    Cytogenetic: "6p24.3",
    PositionVCF: "7584161",
    ReferenceAlleleVCF: "A",
    AlternateAlleleVCF: "G"
  },
  {
    Type: "single nucleotide variant",
    GeneSymbol: "SCN10A",
    HGNC_ID: "HGNC:10582",
    Assembly: "GRCh37",
    ChromosomeAccession: "NC_000003.11",
    Chromosome: "3",
    Cytogenetic: "3p22.2",
    PositionVCF: "38835431",
    ReferenceAlleleVCF: "A",
    AlternateAlleleVCF: "G"
  },
  // Hereditary cancer-predisposing syndrome
  {
    Type: "Deletion",
    GeneSymbol: "BRCA1",
    HGNC_ID: "HGNC:1100",
    Assembly: "GRCh38",
    ChromosomeAccession: "NC_000017.11",
    Chromosome: "17",
    Cytogenetic: "17q21.31",
    PositionVCF: "43091818",
    ReferenceAlleleVCF: "G",
    AlternateAlleleVCF: "T"
  },
  {
    Type: "single nucleotide variant",
    GeneSymbol: "PRKAR1A",
    HGNC_ID: "HGNC:9388",
    Assembly: "GRCh38",
    ChromosomeAccession: "NC_000017.11",
    Chromosome: "17",
    Cytogenetic: "17q24.2",
    PositionVCF: "68525750",
    ReferenceAlleleVCF: "T",
    AlternateAlleleVCF: "G"
  },
  // Inborn genetic diseases
  {
    Type: "single nucleotide variant",
    GeneSymbol: "KRT14",
    HGNC_ID: "HGNC:6416",
    Assembly: "GRCh38",
    ChromosomeAccession: "NC_000017.11",
    Chromosome: "17",
    Cytogenetic: "17q21.2",
    PositionVCF: "41584300",
    ReferenceAlleleVCF: "C",
    AlternateAlleleVCF: "T"
  },
  {
    Type: "single nucleotide variant",
    GeneSymbol: "ERCC2",
    HGNC_ID: "HGNC:3434",
    Assembly: "GRCh38",
    ChromosomeAccession: "NC_000019.10",
    Chromosome: "19",
    Cytogenetic: "19q13.32",
    PositionVCF: "45364260",
    ReferenceAlleleVCF: "C",
    AlternateAlleleVCF: "G"
  },
  // Developmental and epileptic encephalopathy
  {
    Type: "single nucleotide variant",
    GeneSymbol: "SCN1A",
    HGNC_ID: "HGNC:10585",
    Assembly: "GRCh37",
    ChromosomeAccession: "NC_000002.11",
    Chromosome: "2",
    Cytogenetic: "2q24.3",
    PositionVCF: "166850411",
    ReferenceAlleleVCF: "A",
    AlternateAlleleVCF: "G"
  },
  {
    Type: "single nucleotide variant",
    GeneSymbol: "KCNQ2",
    HGNC_ID: "HGNC:6295",
    Assembly: "GRCh37",
    ChromosomeAccession: "NC_000020.11",
    Chromosome: "20",
    Cytogenetic: "20q13.33",
    PositionVCF: "63445631",
    ReferenceAlleleVCF: "C",
    AlternateAlleleVCF: "T"
  }
]

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    Type: "",
    GeneSymbol: "",
    HGNC_ID: "",
    Assembly: "",
    ChromosomeAccession: "",
    Chromosome: "",
    Cytogenetic: "",
    PositionVCF: "",
    ReferenceAlleleVCF: "",
    AlternateAlleleVCF: "",
  })
  const [prediction, setPrediction] = useState<string>("")
  const [diseaseExplanation, setDiseaseExplanation] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRandomSample = () => {
    // Select a random sample from the predefined variants
    const randomIndex = Math.floor(Math.random() * sampleVariants.length)
    const randomSample = sampleVariants[randomIndex]
    
    // Fill the form with the random sample data
    setFormData(randomSample)
    
    // Clear previous predictions when loading new sample
    setPrediction("")
    setDiseaseExplanation("")
  }

  const handlePredict = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          PositionVCF: Number(formData.PositionVCF)
        })
      })
      const data = await res.json()
      
      if (data.error) {
        setPrediction(`Error: ${data.error}`)
        setDiseaseExplanation("")
      } else {
        setPrediction(`Predicted Phenotype: ${data.predicted_phenotype}`)
        
        // Get the appropriate description for the predicted phenotype
        const phenotypeName = data.predicted_phenotype
        const description = diseaseDescriptions[phenotypeName]
        
        if (description) {
          setDiseaseExplanation(description)
        } else {
          setDiseaseExplanation("No detailed description available for this phenotype. Please consult with a healthcare professional for more information.")
        }
      }
    } catch (err) {
      setPrediction("Error: Could not fetch prediction")
      setDiseaseExplanation("")
    }
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
          AI-Powered Health Prediction
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Enter your genetic variant details to get phenotype predictions
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Genetic Variant Input
          </CardTitle>
          <CardDescription>Provide details exactly as required by the classifier</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Random Sample Button */}
          <div className="flex justify-center mb-4">
            <Button 
              onClick={handleRandomSample} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Use Random Sample
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={formData.Type} onValueChange={(v) => handleInputChange("Type", v)}>
                <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single nucleotide variant">single nucleotide variant</SelectItem>
                  <SelectItem value="Deletion">Deletion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gene Symbol</Label>
              <Input
                placeholder="e.g. SCN10A"
                value={formData.GeneSymbol}
                onChange={(e) => handleInputChange("GeneSymbol", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>HGNC ID</Label>
              <Input
                placeholder="e.g. HGNC:10582"
                value={formData.HGNC_ID}
                onChange={(e) => handleInputChange("HGNC_ID", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Assembly</Label>
              <Select value={formData.Assembly} onValueChange={(v) => handleInputChange("Assembly", v)}>
                <SelectTrigger><SelectValue placeholder="Select Assembly" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="GRCh37">GRCh37</SelectItem>
                  <SelectItem value="GRCh38">GRCh38</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Chromosome Accession</Label>
              <Input
                placeholder="e.g. NC_000003.11"
                value={formData.ChromosomeAccession}
                onChange={(e) => handleInputChange("ChromosomeAccession", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Chromosome</Label>
              <Select value={formData.Chromosome} onValueChange={(v) => handleInputChange("Chromosome", v)}>
                <SelectTrigger><SelectValue placeholder="Select Chromosome" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 22 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                  ))}
                  <SelectItem value="X">X</SelectItem>
                  <SelectItem value="Y">Y</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cytogenetic</Label>
              <Input
                placeholder="e.g. 3p22.2"
                value={formData.Cytogenetic}
                onChange={(e) => handleInputChange("Cytogenetic", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Position VCF</Label>
              <Input
                type="number"
                placeholder="e.g. 38835431"
                value={formData.PositionVCF}
                onChange={(e) => handleInputChange("PositionVCF", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Reference Allele VCF</Label>
              <Select value={formData.ReferenceAlleleVCF} onValueChange={(v) => handleInputChange("ReferenceAlleleVCF", v)}>
                <SelectTrigger><SelectValue placeholder="Select Allele" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="T">T</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Alternate Allele VCF</Label>
              <Select value={formData.AlternateAlleleVCF} onValueChange={(v) => handleInputChange("AlternateAlleleVCF", v)}>
                <SelectTrigger><SelectValue placeholder="Select Allele" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="T">T</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handlePredict} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Get Prediction
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Health Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground font-medium">{prediction}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">AI Generated</Badge>
                <Badge variant="outline">Consult a Doctor</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {diseaseExplanation && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Your Condition</CardTitle>
            <CardDescription>Detailed information about the predicted phenotype</CardDescription>
          </CardHeader>
          <CardContent>
            <TypewriterText 
              text={diseaseExplanation} 
              speed={30} 
              className="text-foreground leading-relaxed text-justify" 
            />
          </CardContent>
        </Card>
      )}

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Professional Consultation
            </CardTitle>
            <CardDescription>Connect with qualified doctors for professional medical advice</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctors">
              <Button className="w-full" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Consult a Doctor
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Activity, Brain, Stethoscope, Phone } from "lucide-react"
// import Link from "next/link"
// import { TypewriterText } from "@/components/typewriter-text"
// import { MiniChat } from "@/components/mini-chat"

// interface FormData {
//   age: string
//   gender: string
//   height: string
//   weight: string
//   bloodPressure: string
//   heartRate: string
//   temperature: string
//   symptoms: string
//   medicalHistory: string
//   medications: string
//   lifestyle: string
//   familyHistory: string
// }

// const diseaseExplanations = [
//   "Hypertension is a condition where blood pressure is consistently elevated. It's often called the 'silent killer' because it typically has no symptoms. Regular monitoring and lifestyle changes like reducing salt intake, exercising regularly, and managing stress can help control blood pressure levels.",
//   "Seasonal allergies occur when your immune system overreacts to airborne substances like pollen. Common symptoms include sneezing, runny nose, and itchy eyes. Treatment options include antihistamines, nasal sprays, and avoiding known allergens when possible.",
//   "Maintaining good health requires a balanced approach including regular exercise, proper nutrition, adequate sleep, and stress management. Continue your healthy habits and schedule regular check-ups with your healthcare provider.",
//   "Stress-related fatigue is your body's response to prolonged physical or mental stress. It can affect sleep quality, energy levels, and overall well-being. Consider relaxation techniques, regular exercise, and ensuring adequate rest to manage stress effectively.",
//   "Cardiovascular health is crucial for overall well-being. Regular exercise, a heart-healthy diet rich in fruits and vegetables, maintaining a healthy weight, and avoiding smoking can significantly improve heart health and reduce disease risk.",
// ]

// export default function HomePage() {
//   const [formData, setFormData] = useState<FormData>({
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     bloodPressure: "",
//     heartRate: "",
//     temperature: "",
//     symptoms: "",
//     medicalHistory: "",
//     medications: "",
//     lifestyle: "",
//     familyHistory: "",
//   })
//   const [prediction, setPrediction] = useState<string>("")
//   const [diseaseExplanation, setDiseaseExplanation] = useState<string>("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handlePredict = async () => {
//     setIsLoading(true)
//     // Simulate AI prediction
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     const predictions = [
//       "Based on your symptoms and vital signs, you may be experiencing mild hypertension. Consider lifestyle modifications and consult with a healthcare provider.",
//       "Your symptoms suggest possible seasonal allergies. Monitor symptoms and consider antihistamines if they persist.",
//       "The data indicates good overall health markers. Continue maintaining your current lifestyle habits.",
//       "Your symptoms may indicate stress-related fatigue. Consider stress management techniques and adequate rest.",
//       "Based on the information provided, you may benefit from a cardiovascular health assessment.",
//     ]

//     const randomIndex = Math.floor(Math.random() * predictions.length)
//     setPrediction(predictions[randomIndex])
//     setDiseaseExplanation(diseaseExplanations[randomIndex])
//     setIsLoading(false)
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI-Powered Health Prediction</h1>
//         <p className="text-lg text-muted-foreground text-pretty">
//           Enter your health information to get personalized insights and connect with nearby healthcare providers
//         </p>
//       </div>

//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Stethoscope className="h-5 w-5 text-primary" />
//             Health Information Form
//           </CardTitle>
//           <CardDescription>Please provide accurate information for the best predictions</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="age">Age</Label>
//               <Input
//                 id="age"
//                 type="number"
//                 placeholder="Enter your age"
//                 value={formData.age}
//                 onChange={(e) => handleInputChange("age", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="gender">Gender</Label>
//               <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select gender" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="male">Male</SelectItem>
//                   <SelectItem value="female">Female</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="height">Height (cm)</Label>
//               <Input
//                 id="height"
//                 type="number"
//                 placeholder="Enter height in cm"
//                 value={formData.height}
//                 onChange={(e) => handleInputChange("height", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="weight">Weight (kg)</Label>
//               <Input
//                 id="weight"
//                 type="number"
//                 placeholder="Enter weight in kg"
//                 value={formData.weight}
//                 onChange={(e) => handleInputChange("weight", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="bloodPressure">Blood Pressure</Label>
//               <Input
//                 id="bloodPressure"
//                 placeholder="e.g., 120/80"
//                 value={formData.bloodPressure}
//                 onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
//               <Input
//                 id="heartRate"
//                 type="number"
//                 placeholder="Enter heart rate"
//                 value={formData.heartRate}
//                 onChange={(e) => handleInputChange("heartRate", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="temperature">Temperature (°C)</Label>
//               <Input
//                 id="temperature"
//                 type="number"
//                 step="0.1"
//                 placeholder="Enter temperature"
//                 value={formData.temperature}
//                 onChange={(e) => handleInputChange("temperature", e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="lifestyle">Lifestyle</Label>
//               <Select value={formData.lifestyle} onValueChange={(value) => handleInputChange("lifestyle", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select lifestyle" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="sedentary">Sedentary</SelectItem>
//                   <SelectItem value="moderate">Moderately Active</SelectItem>
//                   <SelectItem value="active">Very Active</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="symptoms">Current Symptoms</Label>
//               <Textarea
//                 id="symptoms"
//                 placeholder="Describe any current symptoms you're experiencing"
//                 value={formData.symptoms}
//                 onChange={(e) => handleInputChange("symptoms", e.target.value)}
//                 rows={3}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="medicalHistory">Medical History</Label>
//               <Textarea
//                 id="medicalHistory"
//                 placeholder="List any previous medical conditions or surgeries"
//                 value={formData.medicalHistory}
//                 onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
//                 rows={3}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="medications">Current Medications</Label>
//               <Textarea
//                 id="medications"
//                 placeholder="List any medications you're currently taking"
//                 value={formData.medications}
//                 onChange={(e) => handleInputChange("medications", e.target.value)}
//                 rows={2}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="familyHistory">Family Medical History</Label>
//               <Textarea
//                 id="familyHistory"
//                 placeholder="Describe any relevant family medical history"
//                 value={formData.familyHistory}
//                 onChange={(e) => handleInputChange("familyHistory", e.target.value)}
//                 rows={2}
//               />
//             </div>
//           </div>

//           <Button onClick={handlePredict} disabled={isLoading} className="w-full" size="lg">
//             {isLoading ? (
//               <>
//                 <Activity className="mr-2 h-4 w-4 animate-spin" />
//                 Analyzing...
//               </>
//             ) : (
//               <>
//                 <Brain className="mr-2 h-4 w-4" />
//                 Get AI Prediction
//               </>
//             )}
//           </Button>
//         </CardContent>
//       </Card>

//       {prediction && (
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Brain className="h-5 w-5 text-primary" />
//               AI Health Prediction
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="p-4 bg-muted rounded-lg">
//                 <p className="text-foreground">{prediction}</p>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <Badge variant="secondary">AI Generated</Badge>
//                 <Badge variant="outline">Consult a Doctor</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {diseaseExplanation && (
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Understanding Your Condition</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <TypewriterText text={diseaseExplanation} speed={30} className="text-foreground leading-relaxed" />
//           </CardContent>
//         </Card>
//       )}

//       {prediction && (
//         <div className="mb-8">
//           <MiniChat diseaseInfo={prediction} />
//         </div>
//       )}

//       {prediction && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Phone className="h-5 w-5 text-primary" />
//               Professional Consultation
//             </CardTitle>
//             <CardDescription>Connect with qualified doctors for professional medical advice</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/doctors">
//               <Button className="w-full" size="lg">
//                 <Phone className="mr-2 h-4 w-4" />
//                 Consult a Doctor
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }
