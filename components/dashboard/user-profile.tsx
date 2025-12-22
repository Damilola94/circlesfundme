import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { formatFullName } from "@/lib/utils";

interface DocumentItem {
  documentType: string;
  url: string;
  name: string | null;
}

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
    document: DocumentItem[];
  };
}

const getDocumentIcon = (url: string) => {
  const lowerUrl = url?.toLowerCase();
  if (lowerUrl?.endsWith(".pdf")) return "/assets/images/pdf-icon.png";
  if (lowerUrl?.endsWith(".jpg") || lowerUrl?.endsWith(".jpeg") || lowerUrl?.endsWith(".png")) {
    return "/assets/images/image-icon.png";
  }
  return "/assets/images/file-icon.png";
};

export function UserProfile({ user }: UserProfileProps) {
  const documents = user.document.map((doc, index) => ({
    id: index + 1,
    name: doc.name || doc.documentType,
    date: new Date().toLocaleDateString(),
    size: "—",
    iconSrc: getDocumentIcon(doc.url),
    url: doc.url,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="relative mx-auto mb-4 h-24 w-24">
            <Image
              src={user.image || "/assets/images/display-photo.png"}
              alt={user.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 font-outfit">{ formatFullName(user.name)}</h3>
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
            <span className="text-sm text-gray-600">Full Name</span>
            <span className="text-sm font-medium">{formatFullName(user.name)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Date of Birth</span>
            <span className="text-sm font-medium">{user.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Gender</span>
            <span className="text-sm font-medium">{user.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Scheme</span>
            <span className="text-sm font-medium">{user.scheme}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Contribution</span>
            <span className="text-sm font-medium">{user.contribution}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">BVN</span>
            <span className="text-sm font-medium">{user.bvn}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.length > 0 ? (
            documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={document.iconSrc}
                    alt={document.name}
                    width={30}
                    height={30}
                    className="object-contain"
                    priority={document.id === 2}
                  />
                  <div>
                    <p className="text-sm font-medium font-outfit">{document.name}</p>
                    <p className="text-xs text-gray-500 font-outfit">
                      {document.date} - {document.size}
                    </p>
                  </div>
                </div>
                <a href={document.url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 text-gray-400 cursor-pointer" />
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 font-outfit text-center">
              No documents available
            </p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
