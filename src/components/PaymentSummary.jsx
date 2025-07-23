// src/components/PaymentSummary.jsx
import { YStack, XStack, Text, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'

export default function PaymentSummary({ products, delivery, onConfirm, onBack }) {
    const navigate = useNavigate()
    const baseFee = 2000
    const deliveryFee = delivery.fee ?? 5000
    const subtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0)
    const total = subtotal + baseFee + deliveryFee

    return (
        <YStack gap="$3" width="100%" ai="center">
            <Text fs="$5" fontWeight="bold">Resumen de pago</Text>

            <Text>Subtotal: ${subtotal}</Text>
            <Text>Tarifa base: ${baseFee}</Text>
            <Text>Envío: ${deliveryFee}</Text>
            <Text fontWeight="bold">Total: ${total}</Text>

            <XStack width="100%" justifyContent="space-between" mt="$4">
                <Button
                    theme="gray"
                    flex={1}
                    onPress={onBack}
                >
                    Atrás
                </Button>
                <Button
                    theme="active"
                    flex={1}
                    onPress={onConfirm}
                >
                    Confirmar
                </Button>
            </XStack>
        </YStack>
    )
}
