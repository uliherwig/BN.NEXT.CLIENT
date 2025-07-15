// config.ts
import { z } from 'zod'

export const formConfig = {
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, minLength: 2 },
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
    { name: 'age', label: 'Alter', type: 'number', required: true, min: 18 },
  ],
} as const

// Zod-Schema automatisch erzeugen aus config
export const buildSchema = () => {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of formConfig.fields) {
    let base: z.ZodTypeAny

    switch (field.type) {
      case 'text':
      case 'email':
        base = z.string()
        if (field.required) base = base.min(1, `${field.label} ist erforderlich`)
        if (field.minLength) base = base.min(field.minLength, `${field.label} ist zu kurz`)
        if (field.type === 'email') base = base.email('Ungültige E-Mail')
        break
      case 'number':
        base = z.coerce.number()
        if (field.required) base = base.refine((n) => !isNaN(n), `${field.label} ist erforderlich`)
        if (field.min) base = base.min(field.min, `${field.label} muss ≥ ${field.min} sein`)
        break
      default:
        base = z.any()
    }

    shape[field.name] = base
  }

  return z.object(shape)
}
