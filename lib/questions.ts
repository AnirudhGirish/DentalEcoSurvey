export type Question = {
    id: number;
    text: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    section: 'Knowledge' | 'Attitude' | 'Practice';
};

export const questions: Question[] = [
    // Part 1 – Knowledge Section
    {
        id: 1,
        text: "What is the most effective way to minimize dental waste?",
        options: {
            A: "Use more materials",
            B: "Proper segregation at source",
            C: "Mixing all waste together",
            D: "Delayed disposal"
        },
        correctAnswer: "B",
        explanation: "Segregation at source facilitates recycling and safe disposal.",
        section: "Knowledge"
    },
    // {
    //     id: 2,
    //     text: "Which of the following can be sterilized and reused?",
    //     options: {
    //         A: "Disposable gloves",
    //         B: "Glass dappen dishes",
    //         C: "Impression trays (plastic)",
    //         D: "Cotton rolls"
    //     },
    //     correctAnswer: "B",
    //     explanation: "Glass items can be autoclaved and reused safely.",
    //     section: "Knowledge"
    // },
    {
        id: 2,
        text: "Which of the following wastes is considered hazardous in dental practice?",
        options: {
            A: "Cotton rolls",
            B: "Latex gloves",
            C: "Amalgam scrap",
            D: "Alginate impression"
        },
        correctAnswer: "C",
        explanation: "Amalgam scrap contains mercury, a hazardous heavy metal.",
        section: "Knowledge"
    },
    {
        id: 3,
        text: "What is the correct disposal method for X-ray fixer solution?",
        options: {
            A: "Drain into sink",
            B: "Send to silver recovery unit",
            C: "Mix with developer",
            D: "Pour in yellow bin"
        },
        correctAnswer: "B",
        explanation: "X-ray fixer contains silver; recycling recovers valuable metal and prevents pollution.",
        section: "Knowledge"
    },
    {
        id: 4,
        text: "What is the best approach to reduce single-use plastic in dentistry?",
        options: {
            A: "Increase stock",
            B: "Replace with autoclavable alternatives",
            C: "Continue single-use for convenience",
            D: "Use plastic disposables only"
        },
        correctAnswer: "B",
        explanation: "Replacing single-use items with reusable alternatives reduces waste.",
        section: "Knowledge"
    },
    {
        id: 5,
        text: "What is the importance of recycling dental materials?",
        options: {
            A: "Saves cost only",
            B: "Reduces environmental pollution",
            C: "Has no real benefit",
            D: "Only for compliance"
        },
        correctAnswer: "B",
        explanation: "Recycling reduces pollution and conserves resources.",
        section: "Knowledge"
    },

    // Part 2 – Attitude Section
    {
        id: 6,
        text: "Do you believe recycling dental materials is important in clinical practice?",
        options: {
            A: "Strongly agree",
            B: "Agree",
            C: "Neutral",
            D: "Disagree"
        },
        correctAnswer: "A",
        explanation: "Recycling reduces environmental burden and aligns with sustainable healthcare.",
        section: "Attitude"
    },
    {
        id: 7,
        text: "Do you think lack of awareness affects recycling practices in dentistry?",
        options: {
            A: "Yes",
            B: "No",
            C: "Maybe",
            D: "Not sure"
        },
        correctAnswer: "A",
        explanation: "Awareness and training are crucial to implementing recycling effectively.",
        section: "Attitude"
    },
    {
        id: 8,
        text: "Should dental institutions include recycling education in their curriculum?",
        options: {
            A: "Yes",
            B: "No",
            C: "Depends on institution",
            D: "Not necessary"
        },
        correctAnswer: "A",
        explanation: "Teaching sustainable practices ensures future professionals adopt eco-friendly methods.",
        section: "Attitude"
    },
    {
        id: 9,
        text: "Would you support government policies mandating recycling in dental clinics?",
        options: {
            A: "Strongly agree",
            B: "Agree",
            C: "Disagree",
            D: "Strongly disagree"
        },
        correctAnswer: "A",
        explanation: "Regulations encourage uniform compliance and responsible waste handling.",
        section: "Attitude"
    },
    {
        id: 10,
        text: "Do you believe recycling adds financial benefit to dental clinics?",
        options: {
            A: "Yes",
            B: "No",
            C: "Sometimes",
            D: "Not sure"
        },
        correctAnswer: "C",
        explanation: "Recycling saves costs on waste disposal and can recover valuable materials.",
        section: "Attitude"
    },
    {
        id: 11,
        text: "Are you confident about identifying recyclable materials in your practice?",
        options: {
            A: "Yes",
            B: "No",
            C: "To some extent",
            D: "Not sure"
        },
        correctAnswer: "C",
        explanation: "Awareness and training increase confidence in correct segregation.",
        section: "Attitude"
    },
    {
        id: 12,
        text: "Do you believe all dental staff should be trained in recycling procedures?",
        options: {
            A: "Yes",
            B: "No",
            C: "Depends",
            D: "Only dentists"
        },
        correctAnswer: "A",
        explanation: "A team approach ensures consistent and correct recycling practices.",
        section: "Attitude"
    },
    {
        id: 13,
        text: "Should recycling be a mandatory part of infection control protocol?",
        options: {
            A: "Yes",
            B: "No",
            C: "Optional",
            D: "Not applicable"
        },
        correctAnswer: "A",
        explanation: "Integrating recycling with infection control reinforces safe and sustainable operations.",
        section: "Attitude"
    },
    {
        id: 14,
        text: "Do you agree that recycling improves the professional image of dental clinics?",
        options: {
            A: "Yes",
            B: "No",
            C: "Not sure",
            D: "Only in some cases"
        },
        correctAnswer: "A",
        explanation: "Environmentally responsible clinics are viewed more positively by patients.",
        section: "Attitude"
    },
    {
        id: 15,
        text: "Would you be willing to participate in a recycling awareness program?",
        options: {
            A: "Yes",
            B: "No",
            C: "Maybe",
            D: "Already participating"
        },
        correctAnswer: "A",
        explanation: "Participation encourages knowledge-sharing and commitment to improvement.",
        section: "Attitude"
    },

    // Part 3 – Practice Section
    {
        id: 16,
        text: "Do you currently segregate dental waste in your practice?",
        options: {
            A: "Always",
            B: "Often",
            C: "Sometimes",
            D: "Never"
        },
        correctAnswer: "A",
        explanation: "Proper segregation is essential for safe disposal and recycling efficiency.",
        section: "Practice"
    },
    {
        id: 17,
        text: "Do you label and store recyclable waste separately from general waste?",
        options: {
            A: "Always",
            B: "Sometimes",
            C: "Rarely",
            D: "Never"
        },
        correctAnswer: "A",
        explanation: "Labelling ensures clear identification and prevents contamination.",
        section: "Practice"
    },
    {
        id: 18,
        text: "Do you maintain records of recycled materials in your clinic?",
        options: {
            A: "Yes",
            B: "No",
            C: "Occasionally",
            D: "Not required"
        },
        correctAnswer: "A",
        explanation: "Documentation demonstrates accountability and compliance with waste rules.",
        section: "Practice"
    },
    {
        id: 19,
        text: "Have you attended any workshop on dental waste recycling?",
        options: {
            A: "Yes",
            B: "No",
            C: "Planning to attend",
            D: "Not interested"
        },
        correctAnswer: "B",
        explanation: "Workshops enhance understanding and promote implementation of recycling programs.",
        section: "Practice"
    },
    {
        id: 20,
        text: "Do you train your staff in proper waste segregation and recycling?",
        options: {
            A: "Yes",
            B: "No",
            C: "Occasionally",
            D: "Not required"
        },
        correctAnswer: "A",
        explanation: "Training ensures every staff member contributes to sustainable waste management.",
        section: "Practice"
    },
    {
        id: 21,
        text: "Are you willing to adopt advanced recycling technologies in your clinic?",
        options: {
            A: "Yes",
            B: "No",
            C: "Maybe",
            D: "Not sure"
        },
        correctAnswer: "A",
        explanation: "Adoption of new technologies supports eco-friendly, modern dental practice.",
        section: "Practice"
    }
];
