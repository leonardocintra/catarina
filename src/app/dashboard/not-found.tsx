'use client'

import Link from 'next/link'
import { ArrowLeft, Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DashboardNotFound() {
  return (
    <div className="min-h-svh flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {/* Ícone */}
          <div className="mb-6 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold mb-2">
            Página do Dashboard não encontrada
          </h2>

          {/* Descrição */}
          <p className="text-muted-foreground mb-8">
            A página que você está tentando acessar no dashboard não existe ou foi removida.
          </p>

          {/* Número 404 */}
          <div className="mb-8">
            <div className="text-5xl font-bold text-muted-foreground/50">
              404
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 w-full">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            
            <Link href="/" className="w-full">
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
