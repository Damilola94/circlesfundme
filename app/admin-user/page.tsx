"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Edit2, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import { formatDate } from "@/lib/utils"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"
import Pagination from "@/components/ui/pagination"
import handleFetch from "@/services/api/handleFetch"
import { CreateAdminModal } from "@/components/ui/admin-users/create-admin-modal"
import { EditAdminModal } from "@/components/ui/admin-users/edit-admin-modal"
import { DeleteAdminModal } from "@/components/ui/admin-users/delete-admin-modal"

export default function AdminScreen() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [admins, setAdmins] = useState<any[]>([])
  const [metaData, setMetaData] = useState({
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  })

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "adminusers",
    pQuery: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["adminusers", pageNumber, pageSize],
    auth: true,
  })

  useEffect(() => {
    if (status === "success") {
      if (data?.isSuccess) {
        setAdmins(data.data)
        setMetaData(data.metaData)
      } else {
        toast.error(data?.message || "Failed to fetch admins.")
      }
    }

    if (status === "error") {
      toast.error("Something went wrong while fetching admins.")
    }
  }, [status, data, error])

  const createMutation = useMutation(
    (formData: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      adminType: string
    }) =>
      handleFetch({
        endpoint: "adminusers",
        method: "POST",
        body: formData,
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess) {
          setShowCreateModal(false)
          refetch()
          toast.success("Admin created successfully!")
        } else {
          toast.error(res?.message || "Failed to create admin.")
        }
        setIsCreating(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while creating admin.")
        setIsCreating(false)
      },
    }
  )

  const handleCreateAdmin = (data: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    adminType: string
  }) => {
    setIsCreating(true)
    createMutation.mutate(data)
  }

  const editMutation = useMutation(
    ({
      userId,
      formData,
    }: {
      userId: string
      formData: {
        userId: string
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        adminType: string
      }
    }) =>
      handleFetch({
        endpoint: `adminusers/${userId}`,
        method: "PUT",
        body: formData,
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess) {
          toast.success("Admin updated successfully!")
          refetch()
          setShowEditModal(false)
          setEditingAdmin(null)
        } else {
          toast.error(res?.message || "Failed to update admin.")
        }
        setIsEditing(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while updating admin.")
        setIsEditing(false)
      },
    }
  )

  const handleEditAdmin = (data: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    adminType: string
  }) => {
    if (!editingAdmin) return
    setIsEditing(true)
    editMutation.mutate({
      userId: editingAdmin.userId,
      formData: {
        userId: editingAdmin.userId,
        ...data,
      },
    })
  }

  const openEditModal = (admin: any) => {
    setEditingAdmin(admin)
    setShowEditModal(true)
  }

  const deleteMutation = useMutation(
    (userId: string) =>
      handleFetch({
        endpoint: `adminusers/${userId}`,
        method: "DELETE",
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess) {
          toast.success("Admin deleted successfully!")
          refetch()
          setShowDeleteModal(false)
          setSelectedAdmin(null)
        } else {
          toast.error(res?.message || "Failed to delete admin.")
        }
        setIsDeleting(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while deleting admin.")
        setIsDeleting(false)
      },
    }
  )

  const handleDeleteAdmin = () => {
    if (!selectedAdmin) return
    setIsDeleting(true)
    deleteMutation.mutate(selectedAdmin.userId)
  }

  const openDeleteModal = (admin: any) => {
    setSelectedAdmin(admin)
    setShowDeleteModal(true)
  }
  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPageNumber(1)
  }
  const isLoading = status === "loading"
  const isError = status === "error"

  return (
   <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
    <div className="flex justify-end">
        <Button
          type="submit"
          className="w-fit border border-gray-700 text-gray-500 font-semibold py-3 bg-transparent hover:border-black hover:bg-transparent hover:text-black"
          onClick={() => setShowCreateModal(true)}
        >
          + Add Admin User
        </Button>
      </div>
        <div
          className={`grid gap-4 min-w-[900px] px-6 py-3 font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit grid-cols-7`}
        >
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Admin Type</div>
          <div>Date Added</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 py-8">
              Failed to load admins.
            </p>
          ) : admins.length > 0 ? (
            admins.map((admin) => (
              <Card key={admin.userId} className="shadow-sm bg-white min-w-[900px]">
                <CardContent className="p-6">
                  <div
                    className={`grid w-full gap-4 items-center font-outfit grid-cols-7`}
                  >
                    <span className="font-medium">
                      {`${admin.firstName} ${admin.lastName}`}
                    </span>
                   <span className="max-w-[200px] truncate text-sm">{admin.email}</span>
                    <span className="text-sm">{admin.phoneNumber}</span>
                    <span className="text-sm">{admin.role}</span>
                    <span className="text-sm">
                      {formatDate(admin.createdDate)}
                    </span>
                    <span className="text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Active
                      </span>
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(admin)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteModal(admin)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No admins found.
            </p>
          )}
        </div>

      {!isLoading && !isError && (
        <Pagination
          current={metaData?.currentPage}
          onPageChange={handlePageChange}
          onRowChange={handlePageSizeChange}
          pageSize={metaData?.pageSize}
          total={metaData?.totalCount}
        />
      )}

      <CreateAdminModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateAdmin}
        loading={isCreating}
      />

      {editingAdmin && (
        <EditAdminModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSubmit={handleEditAdmin}
          admin={{
            firstName: editingAdmin.firstName,
            lastName: editingAdmin.lastName,
            email: editingAdmin.email,
            phoneNumber: editingAdmin.phoneNumber,
            adminType: editingAdmin.adminType,
          }}
          isLoading={isEditing}
        />
      )}

      {selectedAdmin && (
        <DeleteAdminModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onConfirm={handleDeleteAdmin}
          adminName={`${selectedAdmin.firstName} ${selectedAdmin.lastName}`}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}
