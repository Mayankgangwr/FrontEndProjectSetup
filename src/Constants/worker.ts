import { IWorkerRequest } from "../Types/IWorkers";

export const roleOptions = [
    {
        id: "669e63cb8f4e15f09968632a",
        header: "Admin",
    },
    {
        id: "66a8c53b7e328d8801f3ac02",
        header: "Worker",
    },
    {
        id: "669e63cb8f4e15f09968632c",
        header: "Manager",
    }
];

export const shiftOptions = [
    {
        id: "769e63cb8f4e15f09968632a",
        header: "Morning",
    },
    {
        id: "769e63cb8f4e15f09968632b",
        header: "Evening",
    },
    {
        id: "769e63cb8f4e15f09968632c",
        header: "Night",
    }
];

export const sampleWorkers: IWorkerRequest[] = [
    {
        _id: "1",
        shiftId: "769e63cb8f4e15f09968632b", // Morning
        roleId: "669e63cb8f4e15f09968632c", // Worker
        displayName: "Virat Kohli",
        username: "john.doe4@example.com",
        password: "password@123",
        phoneNumber: "+1234567489",
        position: "Software Engineer",
        dob: "1985-05-15",
        aadharCard: "123456789012",
        panCard: "ABCDE1234F",
        address: "123 Elm Street, Springfield",
        city: "Springfield",
        state: "Illinois",
        country: "USA",
        pincode: "62701"
    },
    {
        _id: "2",
        shiftId: "769e63cb8f4e15f09968632b", // Evening
        roleId: "669e63cb8f4e15f09968632c", // Manager
        displayName: "Jane Smith",
        username: "jane.smith@example.com",
        password: "securePassword!8",
        phoneNumber: "+0987654321",
        position: "Project Manager",
        dob: "1988-09-22",
        aadharCard: "234567890123",
        panCard: "FGHIJ5678K",
        address: "456 Oak Avenue, Rivertown",
        city: "Rivertown",
        state: "California",
        country: "USA",
        pincode: "90210"
    },
    {
        _id: "3",
        shiftId: "769e63cb8f4e15f09968632c", // Night
        roleId: "669e63cb8f4e15f09968632a", // Admin
        displayName: "Robert Brown",
        username: "robert.brown@example.com",
        password: "admin@9Password",
        phoneNumber: "+1122334455",
        position: "System Administrator",
        dob: "1977-12-30",
        aadharCard: "345678901234",
        panCard: "JKLMN6789P",
        address: "789 Pine Road, Hilltown",
        city: "Hilltown",
        state: "Texas",
        country: "USA",
        pincode: "75001"
    },
    {
        _id: "4",
        shiftId: "769e63cb8f4e15f09968632a", // Morning
        roleId: "66a8c53b7e328d8801f3ac02", // Worker
        displayName: "Emily Davis",
        username: "emily.davis@example.com",
        password: "password@456",
        phoneNumber: "+1223344556",
        position: "UI/UX Designer",
        dob: "1992-07-11",
        aadharCard: "456789012345",
        panCard: "NOPQR9876S",
        address: "321 Birch Street, Lakeview",
        city: "Lakeview",
        state: "Florida",
        country: "USA",
        pincode: "33101"
    },
    {
        _id: "5",
        shiftId: "769e63cb8f4e15f09968632b", // Evening
        roleId: "669e63cb8f4e15f09968632c", // Manager
        displayName: "Michael Johnson",
        username: "michael.johnson@example.com",
        password: "managerPass!99",
        phoneNumber: "+1334455667",
        position: "Operations Manager",
        dob: "1984-02-14",
        aadharCard: "567890123456",
        panCard: "QRSTU1234V",
        address: "654 Maple Drive, Greenfield",
        city: "Greenfield",
        state: "New York",
        country: "USA",
        pincode: "10001"
    },
    {
        _id: "6",
        shiftId: "769e63cb8f4e15f09968632c", // Night
        roleId: "669e63cb8f4e15f09968632a", // Admin
        displayName: "Sarah Wilson",
        username: "sarah.wilson@example.com",
        password: "admin@321",
        phoneNumber: "+1445566778",
        position: "Network Engineer",
        dob: "1990-11-23",
        aadharCard: "678901234567",
        panCard: "UVWXY6789Z",
        address: "987 Cedar Lane, Brookside",
        city: "Brookside",
        state: "Ohio",
        country: "USA",
        pincode: "44101"
    },
    {
        _id: "7",
        shiftId: "769e63cb8f4e15f09968632a", // Morning
        roleId: "66a8c53b7e328d8801f3ac02", // Worker
        displayName: "David Martinez",
        username: "david.martinez@example.com",
        password: "workerPass@12",
        phoneNumber: "+1556677889",
        position: "Data Analyst",
        dob: "1995-03-05",
        aadharCard: "789012345678",
        panCard: "XYZAB2345C",
        address: "147 Elm Street, Valleyview",
        city: "Valleyview",
        state: "Michigan",
        country: "USA",
        pincode: "48201"
    },
    {
        _id: "8",
        shiftId: "769e63cb8f4e15f09968632b", // Evening
        roleId: "669e63cb8f4e15f09968632c", // Manager
        displayName: "Linda Thompson",
        username: "linda.thompson@example.com",
        password: "manager@123",
        phoneNumber: "+1667788990",
        position: "HR Manager",
        dob: "1983-06-28",
        aadharCard: "890123456789",
        panCard: "ABCDE9876F",
        address: "258 Oak Avenue, Hillcrest",
        city: "Hillcrest",
        state: "Pennsylvania",
        country: "USA",
        pincode: "19101"
    },
    {
        _id: "9",
        shiftId: "769e63cb8f4e15f09968632c", // Night
        roleId: "669e63cb8f4e15f09968632a", // Admin
        displayName: "James Lee",
        username: "james.lee@example.com",
        password: "adminPass@456",
        phoneNumber: "+1778899001",
        position: "Database Administrator",
        dob: "1987-08-17",
        aadharCard: "901234567890",
        panCard: "FGHIJ6789K",
        address: "369 Pine Road, Westview",
        city: "Westview",
        state: "Georgia",
        country: "USA",
        pincode: "30301"
    },
    {
        _id: "10",
        shiftId: "769e63cb8f4e15f09968632a", // Morning
        roleId: "66a8c53b7e328d8801f3ac02", // Worker
        displayName: "Laura Green",
        username: "laura.green@example.com",
        password: "worker@789",
        phoneNumber: "+1889900112",
        position: "Marketing Specialist",
        dob: "1991-12-01",
        aadharCard: "012345678901",
        panCard: "JKLMN1234Q",
        address: "741 Birch Street, Northside",
        city: "Northside",
        state: "Colorado",
        country: "USA",
        pincode: "80201"
    }
];
