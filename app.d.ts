type Company = {
  id: string;
  name: string;
  logo: string;
  achievements: string[];
  description: string;
  startDate?: string;
}

type Technology = {
  id: string;
  name: string;
  logo: string;
  currentlyUsing?: boolean;
}

type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  company: Company;
  technologies: Technology[];
  website: string;
}