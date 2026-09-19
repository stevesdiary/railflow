import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { JourneySelectionPage } from './pages/JourneySelectionPage';
import { JourneyDetailsPage } from './pages/JourneyDetailsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { PassengerInformationPage } from './pages/PassengerInformationPage';
import { PassengerPaymentPage } from './pages/PassengerPaymentPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { PassengerProfilePage } from './pages/PassengerProfilePage';
import { BookingDetailsPage } from './pages/BookingDetailsPage';
import { SavedPassengersPage } from './pages/SavedPassengersPage';
import { NotificationCenterPage } from './pages/NotificationCenterPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { VirtualWaitingRoomPage } from './pages/VirtualWaitingRoomPage';
import { CancellationConfirmationPage } from './pages/CancellationConfirmationPage';
import { CancellationStatusPage } from './pages/CancellationStatusPage';
import { SessionExpiredPage } from './pages/SessionExpiredPage';
import { AccountLockedPage } from './pages/AccountLockedPage';
import { RefundStatusPage } from './pages/RefundStatusPage';
import { BookingStatusRACPage } from './pages/BookingStatusRACPage';
import { BookingStatusWaitlistPage } from './pages/BookingStatusWaitlistPage';
import { PaymentInitiationPage } from './pages/PaymentInitiationPage';
import { PaymentProcessingPage } from './pages/PaymentProcessingPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentFailedPage } from './pages/PaymentFailedPage';
import { TrainSearchResultsPage } from './pages/TrainSearchResultsPage';
import { SystemStatesLibraryPage } from './pages/SystemStatesLibraryPage';
import { AdminLayout } from './components/ui/AdminLayout';
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AdminJourneysPage } from './pages/AdminJourneysPage';
import { AdminRevenuePage } from './pages/AdminRevenuePage';
import { AdminSystemHealthPage } from './pages/AdminSystemHealthPage';
import { AdminBookingsPage } from './pages/AdminBookingsPage';
import { AdminRefundsPage } from './pages/AdminRefundsPage';
import { AdminAntiAbusePage } from './pages/AdminAntiAbusePage';
import { AdminFleetPage } from './pages/AdminFleetPage';
import { AdminTrainConfigPage } from './pages/AdminTrainConfigPage';
import { AdminRouteManagementPage } from './pages/AdminRouteManagementPage';
import { AdminTerminalControlPage } from './pages/AdminTerminalControlPage';
import { AdminSeatInventoryPage } from './pages/AdminSeatInventoryPage';
import { AdminScheduleJourneyPage } from './pages/AdminScheduleJourneyPage';
import { AdminUserManagementPage } from './pages/AdminUserManagementPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export function App() {
  return (
    <Routes>
      {/* Pages with standard Header and Footer */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<JourneySelectionPage />} />
        <Route path="journey/:id" element={<JourneyDetailsPage />} />
        <Route path="seat-selection" element={<SeatSelectionPage />} />
        <Route path="passenger-info" element={<PassengerInformationPage />} />
        <Route path="payment" element={<PassengerPaymentPage />} />
        <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="my-bookings" element={<MyBookingsPage />} />
        <Route path="profile" element={<PassengerProfilePage />} />
        <Route path="saved-passengers" element={<SavedPassengersPage />} />
        <Route path="notifications" element={<NotificationCenterPage />} />
        <Route path="help" element={<HelpCenterPage />} />
        <Route path="waiting-room" element={<VirtualWaitingRoomPage />} />
        <Route path="booking-details/:id" element={<BookingDetailsPage />} />
        <Route path="refund-status/:id" element={<RefundStatusPage />} />
        <Route path="booking-status-rac/:id" element={<BookingStatusRACPage />} />
        <Route path="booking-status-waitlist/:id" element={<BookingStatusWaitlistPage />} />
        <Route path="search-results" element={<TrainSearchResultsPage />} />
        <Route path="system-states" element={<SystemStatesLibraryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Pages without standard layout */}
      <Route path="payment-initiation" element={<PaymentInitiationPage />} />
      <Route path="payment-processing" element={<PaymentProcessingPage />} />
      <Route path="payment-success" element={<PaymentSuccessPage />} />
      <Route path="payment-failed" element={<PaymentFailedPage />} />
      <Route path="cancellation-confirmation/:id" element={<CancellationConfirmationPage />} />
      <Route path="cancellation-status/:id" element={<CancellationStatusPage />} />
      <Route path="session-expired" element={<SessionExpiredPage />} />
      <Route path="account-locked" element={<AccountLockedPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="verify-email" element={<VerifyEmailPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      {/* Admin Flow */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="journeys" element={<AdminJourneysPage />} />
        <Route path="revenue" element={<AdminRevenuePage />} />
        <Route path="refunds" element={<AdminRefundsPage />} />
        <Route path="anti-abuse" element={<AdminAntiAbusePage />} />
        <Route path="system-health" element={<AdminSystemHealthPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="fleet" element={<AdminFleetPage />} />
        <Route path="train-config" element={<AdminTrainConfigPage />} />
        <Route path="route-management" element={<AdminRouteManagementPage />} />
        <Route path="terminal-control" element={<AdminTerminalControlPage />} />
        <Route path="seat-inventory" element={<AdminSeatInventoryPage />} />
        <Route path="schedule-journey" element={<AdminScheduleJourneyPage />} />
        <Route path="user-management" element={<AdminUserManagementPage />} />
      </Route>
    </Routes>
  );
}
