import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Download } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
    image: string;
    dateOfBirth: string;
    gender: string;
    scheme: string;
    contribution: string;
    bvn: string;
  };
}

const documents = [
  {
    id: 1,
    name: "Utility bill.pdf",
    date: "10/05/2025",
    size: "0.5mb",
    iconSrc: "/assets/images/pdf-icon.png",
  },
  {
    id: 2,
    name: "Voters card.pdf",
    date: "10/05/2025",
    size: "0.5mb",
    iconSrc: "/assets/images/pdf-icon.png",
  },
  {
    id: 3,
    name: "National ID.pdf",
    date: "10/05/2025",
    size: "0.5mb",
    iconSrc: "/assets/images/pdf-icon.png",
  },
];

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="relative mx-auto mb-4 h-24 w-24">
            <Image
              src="/assets/images/display-photo.png"
              alt={user.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 font-outfit">{user.name}</h3>
          <p className="text-sm text-gray-500 font-outfit">{user.email}</p>
          <p className="text-sm text-gray-500 font-outfit">{user.phone}</p>
          <p className="text-sm text-gray-500 font-outfit">Joined 20/05/2025</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between font-outfit">
            <span className="text-sm text-gray-600 font-outfit">Full Name</span>
            <span className="text-sm font-medium font-outfit">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-outfit">Date of Birth</span>
            <span className="text-sm font-medium font-outfit">{user.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-outfit text-gray-600">Gender</span>
            <span className="text-sm font-medium font-outfit">{user.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 font-outfit">Scheme</span>
            <span className="text-sm font-medium font-outfit">{user.scheme}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-outfit text-gray-600">Contribution</span>
            <span className="text-sm font-medium font-outfit">{user.contribution}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm  font-outfit text-gray-600">BVN</span>
            <span className="text-sm font-medium font-outfit">{user.bvn}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                  <Image
                    src={document.iconSrc}
                    alt={user.name}
                    width={30}
                    height={30}
                    className="object-contain" 
                    priority={document.id === 1}
                  />
                <div>
                  <p className="text-sm font-medium font-outfit">{document.name}</p>
                  <p className="text-xs text-gray-500 font-outfit">
                    {document.date} - {document.size}
                  </p>
                </div>
              </div>
              <Download className="h-4 w-4 text-gray-400 cursor-pointer" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
