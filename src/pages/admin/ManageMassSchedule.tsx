import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { massScheduleAPI, missionStationsAPI } from '../../services/api';
import { getStoredUser } from '../../utils/auth';
import type { MassSchedule, MissionStation } from '../../types';
import { DAYS_OF_WEEK, MASS_SCHEDULE_TYPES, type MassScheduleType } from '../../data/constants';

export default function ManageMassSchedule() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getStoredUser());
  const [schedules, setSchedules] = useState<MassSchedule[]>([]);
  const [missionStations, setMissionStations] = useState<MissionStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MassSchedule | null>(null);
  const [formData, setFormData] = useState<{
    missionStation: string;
    dayOfWeek: typeof DAYS_OF_WEEK[number];
    time: string;
    type: MassScheduleType;
    description: string;
    isActive: boolean;
  }>({
    missionStation: '',
    dayOfWeek: DAYS_OF_WEEK[0],
    time: '',
    type: MASS_SCHEDULE_TYPES[0],
    description: '',
    isActive: true,
  });
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [schedulesData, stationsData] = await Promise.all([
        massScheduleAPI.getAllAdmin(),
        missionStationsAPI.getAllAdmin(),
      ]);
      setSchedules(schedulesData);
      setMissionStations(stationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    // Only fetch once on mount
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchData();
    }
  }, [navigate, fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await massScheduleAPI.update(editing._id, formData);
      } else {
        await massScheduleAPI.create(formData);
      }
      setShowForm(false);
      setEditing(null);
      setFormData({
        missionStation: '',
        dayOfWeek: DAYS_OF_WEEK[0],
        time: '',
        type: MASS_SCHEDULE_TYPES[0],
        description: '',
        isActive: true,
      });
      fetchData();
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule');
    }
  };

  const handleEdit = (schedule: MassSchedule) => {
    setEditing(schedule);
    // Get mission station ID (handle both object and string)
    const stationId = typeof schedule.missionStation === 'object' && schedule.missionStation !== null
      ? schedule.missionStation._id
      : schedule.missionStation;
    
    setFormData({
      missionStation: stationId,
      dayOfWeek: schedule.dayOfWeek as typeof DAYS_OF_WEEK[number],
      time: schedule.time,
      type: schedule.type as MassScheduleType,
      description: schedule.description || '',
      isActive: schedule.isActive || true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    try {
      await massScheduleAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    }
  };

  if (!user) return null;

  // Helper to get mission station ID
  const getStationId = (schedule: MassSchedule): string => {
    if (typeof schedule.missionStation === 'object' && schedule.missionStation !== null) {
      return schedule.missionStation._id;
    }
    return typeof schedule.missionStation === 'string' ? schedule.missionStation : '';
  };

  // Helper to get mission station name
  const getStationName = (schedule: MassSchedule): string => {
    if (typeof schedule.missionStation === 'object' && schedule.missionStation !== null) {
      return schedule.missionStation.name;
    }
    return 'Unknown Station';
  };

  // Group schedules by mission station
  const stationMap = new Map<string, { name: string; schedules: MassSchedule[] }>();
  
  schedules.forEach(schedule => {
    const stationId = getStationId(schedule);
    const stationName = getStationName(schedule);
    
    if (!stationMap.has(stationId)) {
      stationMap.set(stationId, { name: stationName, schedules: [] });
    }
    stationMap.get(stationId)!.schedules.push(schedule);
  });

  const groupedSchedules = Array.from(stationMap.entries())
    .map(([stationId, { name, schedules: stationSchedules }]) => ({
      stationId,
      stationName: name,
      schedules: stationSchedules,
    }))
    .sort((a, b) => a.stationName.localeCompare(b.stationName));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Mass Schedule</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-primary-600 hover:text-primary-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormData({
              missionStation: '',
              dayOfWeek: DAYS_OF_WEEK[0],
              time: '',
              type: MASS_SCHEDULE_TYPES[0],
              description: '',
              isActive: true,
            });
          }}
          className="mb-6 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          + New Schedule
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Edit' : 'Create'} Schedule
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mission Station *</label>
                <select
                  required
                  value={formData.missionStation}
                  onChange={(e) => setFormData({ ...formData, missionStation: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select a mission station</option>
                  {missionStations.map(station => (
                    <option key={station._id} value={station._id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day of Week *</label>
                  <select
                    required
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value as typeof DAYS_OF_WEEK[number] })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {DAYS_OF_WEEK.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 8:00 AM"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MassScheduleType })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  {MASS_SCHEDULE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <label>Active</label>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {groupedSchedules.map(({ stationId, stationName, schedules: stationSchedules }) => (
              <div key={stationId} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-primary-700 text-white px-6 py-3">
                  <h2 className="text-xl font-semibold">{stationName}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stationSchedules.map((schedule) => (
                        <tr key={schedule._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium">{schedule.dayOfWeek}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{schedule.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{schedule.type}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {schedule.description || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                schedule.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {schedule.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(schedule)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(schedule._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

