import React from 'react';
import { Calendar, Clock, MapPin, User, Phone, ChevronUp, ChevronDown } from 'lucide-react';
import { UserData } from '../types';
import { formatDateWithOrdinalAndTime, parseDDMMYYYY } from '../formatDate';

interface SessionsProps {
  userData: UserData | null;
  loading: boolean;
}

// Helper function to check if a session date is upcoming
const isUpcoming = (dateString: string) => {
  const sessionDate = parseDDMMYYYY(dateString);
  if (isNaN(sessionDate.getTime())) return false; // Handle invalid dates

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for comparison
  return sessionDate >= today;
};

export const Sessions: React.FC<SessionsProps> = ({ userData, loading }) => {
  const [showAllSessions, setShowAllSessions] = React.useState(false);
  const [showTokenError, setShowTokenError] = React.useState(false);

  const handleBookSession = (e: React.MouseEvent) => {
    const recoveryBalance = userData?.recoveryBalance || 0;
    const teamBalance = userData?.teamBalance || 0;
    
    if (recoveryBalance === 0 && teamBalance === 0) {
      e.preventDefault();
      setShowTokenError(true);
      setTimeout(() => setShowTokenError(false), 5000); // Hide after 5 seconds
      return;
    }
    
    // If user has tokens, proceed with normal booking
    window.open('https://link.apisystem.tech/widget/survey/RbAQ3IK1JAYihuWJZjKw', '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-300 bg-green-900/20';
      case 'attended':
      case 'showed':
        return 'text-blue-300 bg-blue-900/20';
      case 'no-show':
        return 'text-amber-300 bg-amber-900/20';
      case 'cancelled':
        return 'text-rose-300 bg-rose-900/20';
      case 'invalid':
        return 'text-slate-400 bg-slate-800/20';
      default:
        return 'text-yellow-300 bg-yellow-900/20';
    }
  };

  const getSortedSessions = () => {
    const sessions = userData?.sessions || [];
    const upcomingSessions = sessions.filter(session => isUpcoming(session.date));
    const pastSessions = sessions.filter(session => !isUpcoming(session.date));
    
    // Sort upcoming sessions by date (nearest first)
    upcomingSessions.sort((a, b) => {
      const getDateValue = (dateString: string) => {
        const date = parseDDMMYYYY(dateString);
        return date.getTime();
      };
      
      return getDateValue(a.date) - getDateValue(b.date);
    });
    
    // Sort past sessions by date (most recent first)
    pastSessions.sort((a, b) => {
      const getDateValue = (dateString: string) => {
        const date = parseDDMMYYYY(dateString);
        return date.getTime();
      };
      
      return getDateValue(b.date) - getDateValue(a.date);
    });
    
    return { upcomingSessions, pastSessions };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715]">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <div className="animate-pulse">
              <div className="h-6 bg-[#2a2520] rounded mb-6 w-48"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-20 bg-[#2a2520] rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const appointments = userData?.appointments || [];
  const upcomingAppointments = appointments.filter(apt => isUpcoming(apt.date));
  const pastAppointments = appointments.filter(apt => !isUpcoming(apt.date));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715]">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-6">
          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Your Sessions</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAllSessions(!showAllSessions)}
                  className="flex items-center space-x-1 sm:space-x-2 text-[#d8ba5b] hover:text-[#c9a852] transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">{showAllSessions ? 'Show Less' : 'View All'}</span>
                  <span className="sm:hidden">{showAllSessions ? 'Less' : 'All'}</span>
                  {showAllSessions ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <a
                  href="https://link.apisystem.tech/widget/survey/RbAQ3IK1JAYihuWJZjKw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#d8ba5b] text-[#231f1e] px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Book New Session</span>
                  <span className="sm:hidden">Book</span>
                </a>
              </div>
            </div>

            {/* Token Error Message */}
            {showTokenError && (
              <div className="bg-red-900/20 border border-red-700 rounded-xl p-4 mb-6 animate-pulse">
                <p className="text-red-300 text-center font-medium">
                  ❌ <strong>You need to have tokens to book sessions.</strong> Please purchase sessions first.
                </p>
              </div>
            )}

            {(userData?.sessions || []).length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-[#2a2520] rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-[#3a342f]">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Upcoming Sessions</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6">Ready to schedule your next recovery session?</p>
                <button
                  onClick={handleBookSession}
                  className="bg-[#d8ba5b] text-[#231f1e] px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 inline-block transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Book Your First Session</span>
                  <span className="sm:hidden">Book Session</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {(() => {
                  const { upcomingSessions, pastSessions } = getSortedSessions();
                  
                  return (
                    <>
                      {upcomingSessions.length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-[#d8ba5b]" />
                            Upcoming Sessions ({upcomingSessions.length})
                          </h3>
                          <div className="space-y-4">
                            {(showAllSessions ? upcomingSessions : upcomingSessions.slice(0, 3)).map((session, index) => (
                              <div
                                key={session.id || index}
                                className="border border-[#3a342f] rounded-lg p-3 sm:p-4 hover:bg-[#2a2520] transition-all duration-200"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                                      <div className="bg-[#d8ba5b] rounded-lg p-2">
                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#231f1e]" />
                                      </div>
                                      <div>
                                        <h4 className="text-base sm:text-lg font-semibold text-white">
                                          {session.serviceType || 'Token Session'}
                                        </h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status || 'pending')}`}>
                                          {session.status?.toLowerCase() === 'attended' ? 'Showed' : 
                                           session.status?.toLowerCase() === 'showed' ? 'Showed' : 
                                           session.status?.toLowerCase() === 'no-show' ? 'Missed' : 
                                           (session.status || 'Pending')}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-[#d8ba5b] font-bold text-sm sm:text-lg">{formatDateWithOrdinalAndTime(session.date, session.time)}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-200 text-sm sm:text-base">{session.location || 'HQ Recovery Center'}</span>
                                      </div>
                                    </div>

                                    {session.notes && (
                                      <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[#2a2520] rounded-lg border border-[#3a342f]">
                                        <p className="text-sm text-gray-200">{session.notes}</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="ml-2 sm:ml-4 flex flex-col space-y-2">
                                    <a
                                      href="https://link.apisystem.tech/widget/survey/BclWcIH3io6poSqZnHSG"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-red-300 hover:text-red-200 text-sm font-medium transition-colors"
                                    >
                                      Cancel
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {pastSessions.length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-gray-400" />
                            Past Sessions ({pastSessions.length})
                          </h3>
                          <div className="space-y-4">
                            {(showAllSessions ? pastSessions : pastSessions.slice(0, 3)).map((session, index) => (
                              <div
                                key={session.id || index}
                                className="border border-[#3a342f] rounded-lg p-3 sm:p-4 bg-[#2a2520]/50 opacity-75"
                              >
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <div className="bg-gray-600 rounded-lg p-2">
                                    <Calendar className="w-4 h-4 text-gray-300" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h4 className="font-semibold text-gray-200 text-sm sm:text-base">
                                          {session.serviceType || 'Token Session'}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#d8ba5b] font-semibold">{formatDateWithOrdinalAndTime(session.date, session.time)}</p>
                                      </div>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status || 'completed')}`}>
                                        {session.status?.toLowerCase() === 'attended' ? 'Showed' : 
                                         session.status?.toLowerCase() === 'showed' ? 'Showed' : 
                                         session.status?.toLowerCase() === 'no-show' ? 'Missed' : 
                                         (session.status || 'Completed')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Show All/Show Less functionality moved to main sessions display above */}
          {userData?.sessions && userData.sessions.length > 3 && !showAllSessions && (
            <div className="text-center">
              <button
                onClick={() => setShowAllSessions(true)}
                className="text-[#d8ba5b] hover:text-[#c9a852] font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>View All Sessions ({userData.sessions.length})</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}



          <div className="bg-[#231f1e] rounded-xl p-6 border border-[#3a342f] shadow-lg">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="tel:+353838203627"
                className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border border-[#3a342f] rounded-lg hover:bg-[#2a2520] transition-all duration-200 group"
              >
                <div className="bg-[#2a2520] p-2 rounded-lg group-hover:bg-[#3a342f] transition-colors border border-[#3a342f]">
                  <Phone className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm sm:text-base">Call Us</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">+353 83 820 3627</p>
                </div>
              </a>
              <a
                href="mailto:team@hqrecovery.com"
                className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border border-[#3a342f] rounded-lg hover:bg-[#2a2520] transition-all duration-200 group"
              >
                <div className="bg-[#2a2520] p-2 rounded-lg group-hover:bg-[#3a342f] transition-colors border border-[#3a342f]">
                  <Calendar className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm sm:text-base">Email Support</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">team@hqrecovery.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};