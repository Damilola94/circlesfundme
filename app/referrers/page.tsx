"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "react-toastify"
import { formatDate } from "@/lib/utils"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"

import Pagination from "@/components/ui/pagination"
import handleFetch from "@/services/api/handleFetch"
import { CreateReferrerModal } from "@/components/ui/referral-modals/create-referral-modal"
import { ReferrerCreatedModal } from "@/components/ui/referral-modals/referral-modal-success"
import { DeleteReferrerModal } from "@/components/ui/referral-modals/delete-referrer-modal"
import { EditReferrerModal } from "@/components/ui/referral-modals/edit-referrer-modal"
import { Trash2, Edit2 } from "lucide-react"

export default function ReferralScreen() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [referrers, setReferrers] = useState<any[]>([])
  const [metaData, setMetaData] = useState({
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  })

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdReferrer, setCreatedReferrer] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReferrer, setSelectedReferrer] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingReferrer, setEditingReferrer] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  const { data, status, error, refetch } = useGetQuery({
    endpoint: "referrers",
    pQuery: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["referrers", pageNumber, pageSize],
    auth: true,
  })

  useEffect(() => {
    if (status === "success") {
      if (data?.isSuccess) {
        setReferrers(data.data)
        setMetaData(data.metaData)
      } else {
        toast.error(data?.message || "Failed to fetch referrers.")
      }
    }
    if (status === "error") {
      toast.error("Something went wrong while fetching referrers.")
    }
  }, [status, data, error])

  const createMutation = useMutation(
    (formData: { firstName: string; lastName: string; email: string }) =>
      handleFetch({
        endpoint: "referrers",
        method: "POST",
        body: formData,
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess && res?.data) {
          const newReferrer = res.data
          setCreatedReferrer({
            fullName: `${newReferrer.firstName} ${newReferrer.lastName}`,
            email: newReferrer.email,
            referralCode: newReferrer.referralCode,
          })
          setShowCreateModal(false)
          setShowSuccessModal(true)
          refetch()
          toast.success("Referrer created successfulsssly!")
        } else {
          toast.error(res?.message || "Failed to create referrer.")
        }
        setIsCreating(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while creating referrer.")
        setIsCreating(false)
      },
    }
  )

  const handleCreateReferrer = (data: { fullName: string; email: string }) => {
    const [firstName, ...lastNameParts] = data.fullName.split(" ")
    const lastName = lastNameParts.join(" ") || firstName
    setIsCreating(true)
    createMutation.mutate({
      firstName,
      lastName,
      email: data.email,
    })
  }

  const deleteMutation = useMutation(
    (referrerId: string) =>
      handleFetch({
        endpoint: `referrers/${referrerId}`,
        method: "DELETE",
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess) {
          toast.success("Referrer deleted successfully!")
          refetch()
          setShowDeleteModal(false)
          setSelectedReferrer(null)
        } else {
          toast.error(res?.message || "Failed to delete referrer.")
        }
        setIsDeleting(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while deleting referrer.")
        setIsDeleting(false)
      },
    }
  )

  const handleDeleteReferrer = () => {
    if (!selectedReferrer) return
    setIsDeleting(true)
    deleteMutation.mutate(selectedReferrer.id)
  }

  const openDeleteModal = (referrer: any) => {
    setSelectedReferrer(referrer)
    setShowDeleteModal(true)
  }

  const editMutation = useMutation(
    ({
      referrerId,
      formData,
    }: {
      referrerId: string
      formData: { firstName: string; lastName: string; email: string, id: string }
    }) =>
      handleFetch({
        endpoint: `referrers/${referrerId}`,
        method: "PUT",
        body: formData,
        auth: true,
      }),
    {
      onSuccess: (res: any) => {
        if (res?.isSuccess) {
          toast.success("Referrer updated successfully!")
          refetch()
          setShowEditModal(false)
          setEditingReferrer(null)
        } else {
          toast.error(res?.message || "Failed to update referrer.")
        }
        setIsEditing(false)
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong while updating referrer.")
        setIsEditing(false)
      },
    }
  )

  const handleEditReferrer = (data: {
    firstName: string
    lastName: string
    email: string
    id: string
  }) => {
    if (!editingReferrer) return
    setIsEditing(true)
    editMutation.mutate({
      referrerId: editingReferrer.id,
      formData: data,
    })
  }

  const openEditModal = (referrer: any) => {
    setEditingReferrer(referrer)
    setShowEditModal(true)
  }

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPageNumber(1)
  }

  const isLoading = status === "loading"
  const isError =
    status === "error" || (status === "success" && data && !data.isSuccess)

  return (
    <div className="overflow-x-auto 1140:overflow-visible flex-1 space-y-6 p-6">
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-fit border border-gray-700 text-gray-500 font-semibold py-3 bg-transparent hover:border-black hover:bg-transparent hover:text-black"
          onClick={() => setShowCreateModal(true)}
        >
          + Create New Referrer
        </Button>
      </div>
      <div
        className={`grid gap-4 min-w-[900px] px-6 py-3 font-medium text-gray-500 border-b-2 rounded-t-lg font-outfit grid-cols-8`}
      >
        <div>Name</div>
        <div>Date Added</div>
        <div>Referred Email</div>
        <div>Referrer code</div>
        <div>Total Loan Count</div>
        <div>Total Loan Value (₦)</div>
        <div>Earned Commission</div>
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
            Failed to load referrers.
          </p>
        ) : referrers.length > 0 ? (
          referrers.map((referrer) => (
            <Card key={referrer.id} className="shadow-sm bg-white min-w-[900px]">
              <CardContent className="p-6">
                <div
                  className={`grid w-full gap-4 items-center font-outfit grid-cols-8`}
                >
                  <span className="font-medium">
                    {`${referrer.firstName} ${referrer.lastName}`}
                  </span>
                  <span className="text-sm">
                    {formatDate(referrer.createdDate)}
                  </span>
                  <span className="max-w-[200px] truncate text-sm">
                    {referrer.email}
                  </span>
                  <span className="text-sm">{referrer.referralCode}</span>
                  <span className="text-sm">{referrer.loanCount}</span>
                  <span className="text-sm">₦0.00</span>
                  <span className="text-sm">₦{(referrer.earnedCommission || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(referrer)}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeleteModal(referrer)}
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
            No referrers found.
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

      <CreateReferrerModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateReferrer}
        loading={isCreating}
      />

      {createdReferrer && (
        <ReferrerCreatedModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          fullName={createdReferrer.fullName}
          email={createdReferrer.email}
          referralCode={createdReferrer.referralCode}
        />
      )}

      {selectedReferrer && (
        <DeleteReferrerModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onConfirm={handleDeleteReferrer}
          referrerName={`${selectedReferrer.firstName} ${selectedReferrer.lastName}`}
          isDeleting={isDeleting}
        />
      )}

      {editingReferrer && (
        <EditReferrerModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
          onSubmit={handleEditReferrer}
          referrer={{
            firstName: editingReferrer.firstName,
            lastName: editingReferrer.lastName,
            id: editingReferrer.id,
            email: editingReferrer.email,
          }}
          isLoading={isEditing}
        />
      )}
    </div>
  )
}
