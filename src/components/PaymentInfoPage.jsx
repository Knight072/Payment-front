// src/pages/PaymentInfoPage.jsx
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCustomer } from '../store/CustomerSlice'
import { setDelivery } from '../store/DeliverySlice'
import ModalCreditCardInfo from '../components/ModalCreditCardInfo'
import DeliveryForm from '../components/DeliveryForm'
import { YStack, Button } from 'tamagui'

export default function PaymentInfoPage() {
  const [showCardModal, setShowCardModal] = useState(false)
  const [deliveryData, setDeliveryData] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCardSubmit = (card) => {
    dispatch(setCustomer({ card }))     // guarda tarjeta en Redux (o parte de transaction)
    dispatch(setDelivery(deliveryData)) // guarda dirección
    navigate('/summary')
  }

  return (
    <YStack f={1} p="$4" gap="$4">
      <DeliveryForm onChange={setDeliveryData} />
      <Button
        disabled={!deliveryData}
        onPress={() => setShowCardModal(true)}
        theme="active"
      >
        Pagar con tarjeta
      </Button>

      <ModalCreditCardInfo
        open={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSubmit={handleCardSubmit}
      />
    </YStack>
  )
}
