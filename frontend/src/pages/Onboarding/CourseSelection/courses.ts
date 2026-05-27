type CourseOption = {
    id: string;
    title: string;
    description: string;
    status: 'available' | 'coming_soon';
};

export const courses: CourseOption[] = [
    {
        id: 'Full-Stack-Developer',
        title: 'Full-Stack Developer',
        description: 'Web-development Roadmap',
        status: 'available',
    },
    {
        id: 'python',
        title: 'Python Arena',
        description: 'Python Roadmap',
        status: 'coming_soon',
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity Ops',
        description: 'Cybersecurity Roadmap',
        status: 'coming_soon',
    },
    {
        id: 'java',
        title: 'Java Forge',
        description: 'Java Roadmap',
        status: 'coming_soon',
    },
];