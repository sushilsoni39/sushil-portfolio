
import { Project, Experience, Education, Certification } from './types';

export const CONTACT = {
  phone: '+91 9631713085',
  email: 'sushilsoni39@gmail.com',
  linkedin: 'https://linkedin.com/in/sushil-kumar-b4b32676/',
  github: 'https://github.com/sushilsoni39',
  location: 'Hyderabad, India'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'OCUA (Oracle Communication Unified Assurance)',
    description: 'Engineered high-performance Java microservices using Helidon and Kafka to process massive real-time data streams for global CSPs. Optimized system throughput and reliability within a complex Kubernetes-orchestrated, cloud-native architecture.',
    tags: ['JAVA', 'Helidon MP', 'Kafka', 'Pulsar', 'Kubernetes', 'Jenkins'],
    link: 'https://www.oracle.com/industries/communications/unified-assurance/',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'DX4C (Digital Experience For Communication)',
    description: 'Architected TM Forum-compliant REST APIs and integrated Kafka messaging to orchestrate digital commerce journeys for Oracle’s flagship SaaS solution. Streamlined customer acquisition workflows through robust service orchestration and cloud integration.',
    tags: ['Spring Boot', 'Kafka', 'Helidon', 'Postman', 'Docker', 'Gitlab'],
    link: 'https://www.oracle.com/industries/communications/digital-experience-for-communications/',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'FICO Application WorkBench (FAWB)',
    description: 'Developed a low-code platform utilizing component-based microservices to enable rapid enterprise application delivery. Built scalable, containerized backend services with Spring Boot and optimized RESTful integration patterns.',
    tags: ['JAVA', 'SpringBoot', 'Maven', 'Rest API', 'Postman'],
    link: 'https://www.fico.com/en/products/fico-application-workbench',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Building Segment Prepaid Meter',
    description: 'Designed and developed a functional simulation for a prepaid electricity billing system. Implemented core metering logic using C++ and created a user interface with the QT framework to simulate real-world power consumption scenarios.',
    tags: ['C++', 'QT', 'Embedded Simulation', 'Metering Logic'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Oracle, Hyderabad',
    role: 'Senior Member Of Technical Staff',
    period: 'Sept 2024 - Present',
    project: 'OCUA (Oracle Communication Unified Assurance)',
    techStack: 'JAVA, Helidon MP, Gradle, Kafka, Pulsar, Postman, Rest API, Gitlab, Docker, Kubernetes, Jenkins',
    description: [
      'Taking ownership of microservices.',
      'Requirement gathering, Analysis, Designing, Development, Testing of projects. Involved in full lifecycle of the project.',
      'Handling CSAT, CPU releases and bugs. Maintaining the backlogs and planning the release tasks.',
      'CVE fixes and upgrading vendor apps in the build server.',
      'Automating the repetitive tasks.',
      'Innovating ways to add value in the product.',
      'Mentoring Interns and Juniors.'
    ]
  },
  {
    company: 'Oracle, Hyderabad',
    role: 'Member Of Technical Staff',
    period: 'Sept 2022 - Sept 2024',
    project: 'OCUA (Oracle Communication Unified Assurance)',
    techStack: 'JAVA, Helidon MP, Gradle, Kafka, Pulsar, Postman, Rest API, Gitlab, Docker, Kubernetes',
    description: [
      'Analyzing and Designing the flow for new features.',
      'Writing unit tests using Jnit5 framework and writing Acceptance Tests.',
      'Deploying image in the Kubernetes pod and testing in VMs.'
    ]
  },
  {
    company: 'Oracle, Hyderabad',
    role: 'Associate Staff Engineer',
    period: 'Sept 2020 - Sept 2022',
    project: 'DX4C (Digital Experience For Communication)',
    techStack: 'JAVA, SpringBoot, Gradle, Kafka, Postman, Helidon, Rest API, Gitlab, CI/CD, Docker, Kubernetes',
    description: [
      'Analyzing and Designing the flow for new features.',
      'Implementing features and functionalities in spring-boot/Helidon using Kafka message queues.',
      'Writing unit tests using Spock framework and writing Acceptance Tests.',
      'Configuring CI/CD.',
      'Deploying image in the Kubernetes pod and testing in tenants.'
    ]
  },
  {
    company: 'FICO, Bangalore',
    role: 'Software Engineering Intern',
    period: 'Jan 2020 - July 2020',
    project: 'FAWB (FICO Application WorkBench)',
    techStack: 'JAVA, SpringBoot, Maven, Rest API, Postman',
    description: [
      'Fixing bugs for the tickets assigned.',
      'Developing new features and testing code.'
    ]
  },
  {
    company: 'L & T Technology and Services, Mysore',
    role: 'Summer Internship',
    period: 'Jun 2018 - Jul 2018',
    project: 'Building Segment Prepaid Meter',
    techStack: 'C++, QT',
    description: [
      'Writing code from scratch.',
      'Unit-testing using QT and ensuring all the cases are covered.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'JSS Science & Technology University, Mysore',
    degree: 'Bachelor of Engineering (Aug 2016 - Sep 2020)',
    period: 'Computer Science & Engineering',
    details: 'CGPA 8.93'
  },
  {
    institution: 'Delhi Public School, Bokaro Steel City',
    degree: 'Senior Secondary School (May 2013 - Apr 2015)',
    period: 'PCM | CBSE',
    details: '85.40%'
  },
  {
    institution: 'B. D. Public School, Hajipur',
    degree: 'Secondary School (Apr 2013)',
    period: 'CBSE',
    details: 'CGPA 10'
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: 'Platform Development Manager', category: 'TMForum Career Certified' },
  { title: 'Frameworx Transformation Manager', category: 'TMForum Career Certified' },
  { title: 'Business Development Manager', category: 'TMForum Career Certified' },
  { title: 'Open API Practitioner', category: 'TMForum Career Certified' },
  { title: 'OCI Explorer', category: 'Oracle Cloud Infrastructure Certified' },
  { title: 'OCI Foundations Associate', category: 'Oracle Cloud Infrastructure Certified' },
  { title: 'I-Rise', category: 'Oracle Industry Development Education' },
  { title: 'Get-Ahead', category: 'Oracle Industry Development Education' },
  { title: 'AI For Everyone', category: 'DeepLearning.AI' },
  { title: 'Generative AI for Everyone', category: 'DeepLearning.AI' },
  { title: 'Introduction to Generative AI for Software Development', category: 'DeepLearning.AI' },
  { title: 'Kafka Essentials Training', category: 'LinkedIn Learning Certified' },
  { title: 'DevOps Foundation: CI/CD', category: 'LinkedIn Learning Certified' },
  { title: 'Programming Foundations: Design Patterns', category: 'LinkedIn Learning Certified' },
  { title: 'Learning Jenkins', category: 'LinkedIn Learning Certified' }
];

export const TECH_STACK_GROUPS = [
  { 
    category: 'Languages', 
    items: ['JAVA (Working Exp.)', 'Python (Basics)'] 
  },
  { 
    category: 'Frameworks & Architecture', 
    items: ['SpringBoot', 'Helidon MP', 'RestApi', 'MicroServices'] 
  },
  { 
    category: 'Event Streaming', 
    items: ['Kafka', 'Pulsar'] 
  },
  { 
    category: 'Containers & Cloud', 
    items: ['Docker / Kubernetes', 'Oracle Cloud Infrastructure'] 
  },
  { 
    category: 'Data Systems', 
    items: ['MySql / OracleDb', 'Opensearch'] 
  },
  { 
    category: 'CI/CD & Testing', 
    items: ['CI/CD (Gitlab)', 'Jenkins', 'Postman'] 
  }
];
