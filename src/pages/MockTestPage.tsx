import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Send, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { MOCK_TESTS, MOCK_QUESTIONS } from '../lib/constants';
import { MockTest, MockQuestion } from '../types';

export default function MockTestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const mockTest = MOCK_TESTS.find(test => test.id === id);
  const testQuestions = MOCK_QUESTIONS.filter(q => q.mock_test_id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
  const [timeLeft, setTimeLeft] = useState(mockTest?.duration_minutes ? mockTest.duration_minutes * 60 : 0);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [testStartTime] = useState(new Date());

  // Timer countdown
  useEffect(() => {
    if (isTestSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTestSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestSubmitted]);

  if (!mockTest || testQuestions.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
            <p className="text-gray-600 mb-6">The mock test you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/mock-tests')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Mock Tests
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = testQuestions[currentQuestionIndex];
  const correctAnswerCount = Object.entries(answers).reduce((count, [qId, answer]) => {
    const question = testQuestions.find(q => q.id === qId);
    return answer !== null && question?.correct_answer === answer ? count + 1 : count;
  }, 0);

  const score = (correctAnswerCount / testQuestions.length) * mockTest.total_marks;

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
  };

  // Test Taking Interface
  if (!isTestSubmitted) {
    return (
      <Layout hideFooter>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
          {/* Header with Timer */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/mock-tests')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Back to tests"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="font-bold text-gray-900 text-sm sm:text-base">{mockTest.title}</h1>
                    <p className="text-xs text-gray-600">{mockTest.exam_name}</p>
                  </div>
                </div>

                {/* Timer */}
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                  timeLeft <= 300
                    ? 'bg-red-100 text-red-700'
                    : timeLeft <= 600
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <Clock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => setIsTestSubmitted(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Question Area */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  {/* Question Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-semibold text-blue-600">
                      Question {currentQuestionIndex + 1} of {testQuestions.length}
                    </div>
                    <div className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {currentQuestion?.difficulty || 'Medium'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Text */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                    {currentQuestion?.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setAnswers({ ...answers, [currentQuestion.id]: index })}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all flex items-start gap-3 ${
                          answers[currentQuestion.id] === index
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className={`min-w-6 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          answers[currentQuestion.id] === index
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQuestion.id] === index && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className={`font-medium ${
                            answers[currentQuestion.id] === index
                              ? 'text-blue-900'
                              : 'text-gray-700'
                          }`}>
                            {String.fromCharCode(65 + index)}) {option}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <button
                      onClick={() => setCurrentQuestionIndex(Math.min(testQuestions.length - 1, currentQuestionIndex + 1))}
                      disabled={currentQuestionIndex === testQuestions.length - 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Navigator Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-24">
                  <h3 className="font-bold text-gray-900 mb-4">Question Navigator</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {testQuestions.map((question, index) => (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-full aspect-square rounded-lg font-semibold text-xs flex items-center justify-center transition-all ${
                          index === currentQuestionIndex
                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                            : answers[question.id] !== undefined && answers[question.id] !== null
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={`Question ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Attempted</span>
                      <span className="font-bold text-gray-900">{Object.keys(answers).length}/{testQuestions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unanswered</span>
                      <span className="font-bold text-gray-900">{testQuestions.length - Object.keys(answers).length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Result Page
  const percentage = (score / mockTest.total_marks) * 100;
  const resultColor = percentage >= 75 ? 'green' : percentage >= 50 ? 'yellow' : 'red';
  const resultColorMap = {
    green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  };

  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result Header */}
          <div className={`rounded-2xl shadow-lg p-8 mb-8 ${resultColorMap[resultColor as keyof typeof resultColorMap].bg} border-2 ${resultColorMap[resultColor as keyof typeof resultColorMap].border}`}>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {percentage >= 75 ? (
                  <CheckCircle className={`w-16 h-16 ${resultColorMap[resultColor as keyof typeof resultColorMap].text}`} />
                ) : (
                  <XCircle className={`w-16 h-16 ${resultColorMap[resultColor as keyof typeof resultColorMap].text}`} />
                )}
              </div>
              <h1 className={`text-3xl font-bold ${resultColorMap[resultColor as keyof typeof resultColorMap].text} mb-2`}>
                {percentage >= 75 ? 'Excellent!' : percentage >= 50 ? 'Good Attempt!' : 'Keep Practicing'}
              </h1>
              <p className={`text-lg ${resultColorMap[resultColor as keyof typeof resultColorMap].text}`}>
                You scored {score.toFixed(1)} out of {mockTest.total_marks}
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Score Percentage */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={percentage >= 75 ? '#16a34a' : percentage >= 50 ? '#ca8a04' : '#dc2626'}
                    strokeWidth="8"
                    strokeDasharray={`${(percentage / 100) * 282.6} 282.6`}
                    className="transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{percentage.toFixed(0)}%</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">Percentage</p>
            </div>

            {/* Correct Answers */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{correctAnswerCount}</div>
              <p className="text-gray-600 font-medium">Correct Answers</p>
              <p className="text-sm text-gray-500 mt-2">out of {testQuestions.length}</p>
            </div>

            {/* Wrong Answers */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{testQuestions.length - correctAnswerCount}</div>
              <p className="text-gray-600 font-medium">Incorrect Answers</p>
              <p className="text-sm text-gray-500 mt-2">or unanswered</p>
            </div>
          </div>

          {/* Answer Review */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h2>

            <div className="space-y-6">
              {testQuestions.map((question, index) => {
                const selectedAnswer = answers[question.id];
                const isCorrect = selectedAnswer === question.correct_answer;
                const isUnanswered = selectedAnswer === null || selectedAnswer === undefined;

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-xl p-4 sm:p-6 ${
                      isUnanswered
                        ? 'border-gray-200 bg-gray-50'
                        : isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    {/* Question Number and Status */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="font-bold text-gray-900 text-lg">
                        Question {index + 1}
                      </h3>
                      {isUnanswered ? (
                        <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full text-xs font-semibold">
                          Unanswered
                        </span>
                      ) : isCorrect ? (
                        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Correct
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Incorrect
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <p className="text-gray-900 font-medium mb-4">{question.question}</p>

                    {/* Options Review */}
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => {
                        const isSelected = selectedAnswer === optionIndex;
                        const isCorrectOption = optionIndex === question.correct_answer;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectOption
                                ? 'border-green-400 bg-green-100'
                                : isSelected && !isCorrect
                                ? 'border-red-400 bg-red-100'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCorrectOption && (
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              )}
                              {isSelected && !isCorrect && (
                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                              <span className="text-sm font-medium text-gray-900">
                                {String.fromCharCode(65 + optionIndex)}) {option}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Explanation</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
                setTimeLeft(mockTest.duration_minutes ? mockTest.duration_minutes * 60 : 0);
                setIsTestSubmitted(false);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              Retry Test
            </button>
            <button
              onClick={() => navigate('/mock-tests')}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Back to Mock Tests
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
