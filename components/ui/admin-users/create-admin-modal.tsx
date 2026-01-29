"use client"

import React from "react"

import { useState } from "react"
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

interface CreateAdminModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: {
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        adminType: string
    }) => void
    loading?: boolean
}

export function CreateAdminModal({
    open,
    onOpenChange,
    onSubmit,
    loading = false,
}: CreateAdminModalProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        adminType: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

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
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                adminType: "",
            })
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!loading) {
            onOpenChange(newOpen)
            if (!newOpen) {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    adminType: "",
                })
                setErrors({})
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Admin</DialogTitle>
                    <DialogDescription>
                        Add a new admin account to the system
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName">First Name</label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                disabled={loading}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && (
                                <p className="text-xs text-red-500">{errors.firstName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName">Last Name</label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                disabled={loading}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && (
                                <p className="text-xs text-red-500">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            disabled={loading}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Input
                            id="phoneNumber"
                            placeholder="+234..."
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                            disabled={loading}
                            className={errors.phoneNumber ? "border-red-500" : ""}
                        />
                        {errors.phoneNumber && (
                            <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="adminType">Admin Type</label>
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
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Creating...
                                </>
                            ) : (
                                "Create Admin"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
