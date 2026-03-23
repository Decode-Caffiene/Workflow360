"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"

interface Payslip {
  id: number
  month: string
  year: number
  grossPay: number
  deductions: number
  netPay: number
  status: "Paid" | "Processing"
}

export default function EmployeePayslipPage() {
  const payslips: Payslip[] = [
    { id: 1, month: "March", year: 2026, grossPay: 8500, deductions: 1850, netPay: 6650, status: "Processing" },
    { id: 2, month: "February", year: 2026, grossPay: 8500, deductions: 1850, netPay: 6650, status: "Paid" },
    { id: 3, month: "January", year: 2026, grossPay: 8500, deductions: 1850, netPay: 6650, status: "Paid" },
    { id: 4, month: "December", year: 2025, grossPay: 8500, deductions: 1850, netPay: 6650, status: "Paid" },
    { id: 5, month: "November", year: 2025, grossPay: 8500, deductions: 1850, netPay: 6650, status: "Paid" },
    { id: 6, month: "October", year: 2025, grossPay: 8200, deductions: 1780, netPay: 6420, status: "Paid" },
  ]

  const latestPayslip = payslips[0]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">View Payslip</h1>
        <p className="text-muted-foreground">Access and download your monthly payslips</p>
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gross Pay</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(latestPayslip.grossPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-destructive">-</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deductions</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(latestPayslip.deductions)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-success">=</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Pay</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(latestPayslip.netPay)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payslip History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payslip History</span>
            <Badge variant="secondary">{payslips.length} payslips</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Period</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Gross Pay</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Deductions</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Net Pay</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {payslips.map((payslip) => (
                  <tr key={payslip.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-foreground">
                      {payslip.month} {payslip.year}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground text-right">
                      {formatCurrency(payslip.grossPay)}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground text-right hidden sm:table-cell">
                      {formatCurrency(payslip.deductions)}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground text-right">
                      {formatCurrency(payslip.netPay)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge 
                        className={payslip.status === "Paid" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}
                      >
                        {payslip.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2"
                        disabled={payslip.status === "Processing"}
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
