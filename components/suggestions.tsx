'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Button } from './ui/button'

const upcomingEvents = [
  {
    id: 1,
    title: 'Inscripción de Materias',
    date: 'Marzo 15-20, 2024',
    location: 'Portal Académico',
    attendees: 1250,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Hackathon Universitario',
    date: 'Marzo 25, 2024',
    location: 'Edificio de Ingeniería',
    attendees: 89,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Feria de Empresas',
    date: 'Abril 2, 2024',
    location: 'Centro de Convenciones',
    attendees: 340,
    color: 'bg-emerald-500',
  },
  {
    id: 4,
    title: 'Semana de Exámenes',
    date: 'Abril 8-12, 2024',
    location: 'Todas las Facultades',
    attendees: 2100,
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Torneo Deportivo',
    date: 'Abril 15, 2024',
    location: 'Complejo Deportivo',
    attendees: 156,
    color: 'bg-cyan-500',
  },
]

export function Suggestions() {
  return (
    <div className="w-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Eventos Universitarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className={`h-2 ${event.color}`} />
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-sm leading-tight">{event.title}</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="leading-tight">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="leading-tight">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="leading-tight">{event.attendees} interesados</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
