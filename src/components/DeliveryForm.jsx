// src/components/DeliveryForm.jsx
import { Input, YStack, Text } from 'tamagui'
import { useState, useEffect } from 'react'

export default function DeliveryForm({ onChange }) {
  const [form, setForm] = useState({ address:'', city:'', phone:'' })
  useEffect(() => onChange(form), [form])

  return (
    <YStack gap="$2">
      <Text fontWeight="bold">Datos de envío</Text>
      <Input placeholder="Dirección" value={form.address}
             onChangeText={(v)=>setForm({...form,address:v})}/>
      <Input placeholder="Ciudad" value={form.city}
             onChangeText={(v)=>setForm({...form,city:v})}/>
      <Input placeholder="Teléfono" keyboardType="phone-pad"
             value={form.phone}
             onChangeText={(v)=>setForm({...form,phone:v})}/>
    </YStack>
  )
}
