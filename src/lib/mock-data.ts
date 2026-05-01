export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: 'active' | 'inactive' | 'pending';
  gender: 'Male' | 'Female' | 'Other';
  avatar?: string;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    grade: '10th Grade',
    status: 'active',
    gender: 'Male',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    grade: '11th Grade',
    status: 'active',
    gender: 'Female',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    grade: '10th Grade',
    status: 'inactive',
    gender: 'Male',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    grade: '12th Grade',
    status: 'active',
    gender: 'Female',
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    grade: '9th Grade',
    status: 'pending',
    gender: 'Male',
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    grade: '11th Grade',
    status: 'active',
    gender: 'Female',
  },
  {
    id: '7',
    name: 'Ethan Thompson',
    email: 'ethan.t@example.com',
    grade: '12th Grade',
    status: 'inactive',
    gender: 'Male',
  },
  {
    id: '8',
    name: 'Isabella Taylor',
    email: 'isabella.t@example.com',
    grade: '9th Grade',
    status: 'active',
    gender: 'Female',
  },
  {
    id: '9',
    name: 'Noah Brooks',
    email: 'noah.b@example.com',
    grade: '10th Grade',
    status: 'active',
    gender: 'Male',
  },
  {
    id: '10',
    name: 'Mia Parker',
    email: 'mia.p@example.com',
    grade: '11th Grade',
    status: 'pending',
    gender: 'Female',
  },
  {
    id: '11',
    name: 'Lucas Rivera',
    email: 'lucas.r@example.com',
    grade: '12th Grade',
    status: 'inactive',
    gender: 'Male',
  },
  {
    id: '12',
    name: 'Ava Thompson',
    email: 'ava.t@example.com',
    grade: '9th Grade',
    status: 'active',
    gender: 'Female',
  },
  {
    id: '13',
    name: 'Daniel Kim',
    email: 'daniel.k@example.com',
    grade: '10th Grade',
    status: 'active',
    gender: 'Male',
  },
  {
    id: '14',
    name: 'Sophia Nguyen',
    email: 'sophia.n@example.com',
    grade: '11th Grade',
    status: 'pending',
    gender: 'Female',
  },
  {
    id: '15',
    name: 'Elijah Carter',
    email: 'elijah.c@example.com',
    grade: '12th Grade',
    status: 'active',
    gender: 'Male',
  },
  {
    id: '16',
    name: 'Charlotte Reed',
    email: 'charlotte.r@example.com',
    grade: '9th Grade',
    status: 'inactive',
    gender: 'Female',
  },
];
