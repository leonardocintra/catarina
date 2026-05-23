'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {/* Número 404 grande */}
          <div className="mb-6">
            <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              404
            </div>
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-white mb-2">
            Página não encontrada
          </h1>

          {/* Descrição */}
          <p className="text-slate-400 mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>

          {/* Emote */}
          <div className="mb-8 text-5xl">
            🤔
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 w-full">
            <Link href="/" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Voltar à Home
              </Button>
            </Link>
            
            <Link href="/dashboard" className="w-full">
              <Button 
                variant="outline" 
                className="w-full bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>

          {/* Sugestão */}
          <p className="text-xs text-slate-500 mt-6">
            Se acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </Card>
    </div>
  )
}
