"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface EditAdminModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: {
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        adminType: string
    }) => void
    admin: {
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        adminType: string
    }
    isLoading?: boolean
}

export function EditAdminModal({
    open,
    onOpenChange,
    onSubmit,
    admin,
    isLoading = false,
}: EditAdminModalProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        adminType: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (open) {
            setFormData({
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                adminType: admin.adminType,
            })
        }
    }, [open, admin])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required"
        }
        if (!formData.adminType) {
            newErrors.adminType = "Admin type is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!isLoading) {
            onOpenChange(newOpen)
            if (!newOpen) {
                setErrors({})
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Admin</DialogTitle>
                    <DialogDescription>
                        Update admin account information
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="edit-firstName">First Name</label>
                            <Input
                                id="edit-firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                disabled={isLoading}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && (
                                <p className="text-xs text-red-500">{errors.firstName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="edit-lastName">Last Name</label>
                            <Input
                                id="edit-lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                disabled={isLoading}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && (
                                <p className="text-xs text-red-500">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="edit-email">Email</label>
                        <Input
                            id="edit-email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            disabled={isLoading}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="edit-phoneNumber">Phone Number</label>
                        <Input
                            id="edit-phoneNumber"
                            placeholder="+234..."
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            disabled={isLoading}
                            className={errors.phoneNumber ? "border-red-500" : ""}
                        />
                        {errors.phoneNumber && (
                            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="edit-adminType">Admin Type</label>
                        <Select
                            label="Select Template"
                            options={[
                                { label: "Credit Risk Officer", value: "CreditRiskOfficer" },
                                { label: "Admin Officer", value: "Admin" },
                            ]}
                            value={formData.adminType}
                            onChange={(value) =>
                                setFormData({ ...formData, adminType: value })
                            }
                        />
                        {errors.adminType && (
                            <p className="text-xs text-red-500">{errors.adminType}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Updating...
                                </>
                            ) : (
                                "Update Admin"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
