import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface TimeDistribution {
  name: string;
  value: number;
  percent: number;
}

interface ProblemTime {
  name: string;
  time: number;
}

interface InterviewAnalyticsProps {
  interviewData: {
    duration: number;
    codingTime: number;
    idleTime: number;
    chatMessages: number;
    codeSubmissions: number;
    problems: ProblemTime[];
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InterviewAnalytics: React.FC<InterviewAnalyticsProps> = ({ interviewData }) => {
  const timeDistribution: TimeDistribution[] = [
    { name: 'Coding', value: interviewData.codingTime, percent: (interviewData.codingTime / interviewData.duration) * 100 },
    { name: 'Idle', value: interviewData.idleTime, percent: (interviewData.idleTime / interviewData.duration) * 100 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Interview Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Distribution Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Time Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Spent on Problems Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Time Spent on Problems</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interviewData.problems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Coding Time: {Math.floor(interviewData.codingTime / 60)} minutes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
            <span>Idle Time: {Math.floor(interviewData.idleTime / 60)} minutes</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Chat Messages: {interviewData.chatMessages}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <span>Code Submissions: {interviewData.codeSubmissions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewAnalytics; 