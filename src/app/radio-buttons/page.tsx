"use client";
import React, { useState } from "react";
import "../css/radio-buttons.css";

const QUIZ = {
  "Manual QA": [
    {
      question: "What is exploratory testing?",
      options: [
        "Testing without planning or documentation",
        "Testing based on experience and intuition",
        "Testing only the UI",
        "Testing only APIs"
      ],
      answer: 1
    },
    {
      question: "Which document describes test objectives and scope?",
      options: [
        "Test Plan",
        "Release Notes",
        "User Manual",
        "Bug Report"
      ],
      answer: 0
    },
    {
      question: "What is a test case?",
      options: [
        "A bug report",
        "A set of steps to verify a feature",
        "A user story",
        "A deployment script"
      ],
      answer: 1
    },
    {
      question: "Which is NOT a type of manual testing?",
      options: [
        "Smoke testing",
        "Regression testing",
        "Unit testing",
        "Exploratory testing"
      ],
      answer: 2
    },
    {
      question: "What is the main goal of manual testing?",
      options: [
        "To automate repetitive tasks",
        "To find bugs by executing test cases manually",
        "To write code for test scripts",
        "To deploy applications"
      ],
      answer: 1
    }
  ],
  "Front End Automation": [
    {
      question: "Which tool is commonly used for front-end automation?",
      options: [
        "Selenium",
        "Postman",
        "Burp Suite",
        "JMeter"
      ],
      answer: 0
    },
    {
      question: "What is the main advantage of automated UI tests?",
      options: [
        "They are always faster than manual tests",
        "They never fail",
        "They can be run repeatedly with less effort",
        "They require no maintenance"
      ],
      answer: 2
    },
    {
      question: "Which language is most used with Selenium WebDriver?",
      options: [
        "Python",
        "Java",
        "JavaScript",
        "All of the above"
      ],
      answer: 3
    },
    {
      question: "What is a selector in UI automation?",
      options: [
        "A way to choose a test case",
        "A way to locate elements on a page",
        "A type of assertion",
        "A test report"
      ],
      answer: 1
    },
    {
      question: "Which is NOT a front-end automation tool?",
      options: [
        "Cypress",
        "Playwright",
        "JMeter",
        "TestCafe"
      ],
      answer: 2
    }
  ],
  "API Testing": [
    {
      question: "Which tool is widely used for API testing?",
      options: [
        "Selenium",
        "Postman",
        "Jest",
        "Cypress"
      ],
      answer: 1
    },
    {
      question: "What does a 404 HTTP status code mean?",
      options: [
        "OK",
        "Unauthorized",
        "Not Found",
        "Bad Request"
      ],
      answer: 2
    },
    {
      question: "Which HTTP method is used to update a resource?",
      options: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      answer: 2
    },
    {
      question: "What is a RESTful API?",
      options: [
        "An API that uses SOAP",
        "An API that follows REST principles",
        "An API that only uses XML",
        "An API that is not secure"
      ],
      answer: 1
    },
    {
      question: "Which tool can automate API tests?",
      options: [
        "Postman",
        "JMeter",
        "Rest Assured",
        "All of the above"
      ],
      answer: 3
    }
  ],
  "Security Testing": [
    {
      question: "Which is a common security vulnerability?",
      options: [
        "SQL Injection",
        "Responsive Design",
        "Unit Testing",
        "Continuous Integration"
      ],
      answer: 0
    },
    {
      question: "What does XSS stand for?",
      options: [
        "Cross-Site Scripting",
        "Cross-Site Security",
        "Extra Secure System",
        "External Site Scan"
      ],
      answer: 0
    },
    {
      question: "Which tool is used for security testing?",
      options: [
        "Burp Suite",
        "Jest",
        "Cypress",
        "Selenium"
      ],
      answer: 0
    },
    {
      question: "What is the purpose of penetration testing?",
      options: [
        "To improve UI",
        "To find security vulnerabilities",
        "To write documentation",
        "To automate tests"
      ],
      answer: 1
    },
    {
      question: "Which is NOT a security risk?",
      options: [
        "SQL Injection",
        "Broken Authentication",
        "Strong Passwords",
        "Sensitive Data Exposure"
      ],
      answer: 2
    }
  ],
  "Accessibility Testing": [
    {
      question: "What does accessibility testing focus on?",
      options: [
        "Performance",
        "Security",
        "Usability for people with disabilities",
        "SEO"
      ],
      answer: 2
    },
    {
      question: "Which tool helps check accessibility?",
      options: [
        "axe",
        "Jest",
        "Postman",
        "JMeter"
      ],
      answer: 0
    },
    {
      question: "What is alt text used for?",
      options: [
        "Styling images",
        "Describing images for screen readers",
        "Improving performance",
        "Testing APIs"
      ],
      answer: 1
    },
    {
      question: "Which is an accessibility guideline?",
      options: [
        "WCAG",
        "REST",
        "SQL",
        "CI/CD"
      ],
      answer: 0
    },
    {
      question: "Who benefits from accessibility testing?",
      options: [
        "Only developers",
        "Only testers",
        "All users, especially those with disabilities",
        "Only managers"
      ],
      answer: 2
    }
  ]
};

const TABS = Object.keys(QUIZ) as (keyof typeof QUIZ)[];

function getScore(answers: number[][], quiz: typeof QUIZ) {
  let correct = 0;
  let total = 0;
  TABS.forEach((cat, catIdx) => {
    quiz[cat].forEach((q, qIdx) => {
      total++;
      if (answers[catIdx][qIdx] === q.answer) correct++;
    });
  });
  return { correct, total };
}

function PieChart({ correct, total }: { correct: number; total: number }) {
  const correctPercent = (correct / total) * 100;
  const incorrectPercent = 100 - correctPercent;
  const r = 48;
  const c = 2 * Math.PI * r;
  const correctStroke = (correctPercent / 100) * c;
  const incorrectStroke = (incorrectPercent / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="pie-chart">
      {/* Incorrect (red) */}
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#e53935"
        strokeWidth="22"
        strokeDasharray={`${incorrectStroke} ${c - incorrectStroke}`}
        transform="rotate(-90 70 70)"
      />
      {/* Correct (green) */}
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#43a047"
        strokeWidth="22"
        strokeDasharray={`${correctStroke} ${c - correctStroke}`}
        transform={`rotate(${(incorrectStroke / c) * 360 - 90} 70 70)`}
      />
      {/* Percent text */}
      <text
        x="70"
        y="80"
        textAnchor="middle"
        fontSize="2.2rem"
        fill={correctPercent >= 70 ? "#43a047" : "#e53935"}
        fontWeight="bold"
      >
        {Math.round(correctPercent)}%
      </text>
    </svg>
  );
}

export default function RadioButtonsQuiz() {
  const [tab, setTab] = useState<number>(0);
  const [answers, setAnswers] = useState<number[][]>(
    TABS.map((cat) => Array(QUIZ[cat].length).fill(-1))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (catIdx: number, qIdx: number, val: number) => {
    setAnswers((prev) =>
      prev.map((arr, idx) =>
        idx === catIdx ? arr.map((a, i) => (i === qIdx ? val : a)) : arr
      )
    );
  };

  const allAnswered = answers.every((arr) => arr.every((ans) => ans !== -1));

  const handleSubmit = () => setSubmitted(true);

  const handleRetest = () => {
    setAnswers(TABS.map((cat) => Array(QUIZ[cat].length).fill(-1)));
    setSubmitted(false);
    setTab(0);
  };

  const { correct, total } = getScore(answers, QUIZ);
  const passed = (correct / total) >= 0.7;
  const hasResults = submitted;

  // Scroll to top/tabs
  const scrollToTabs = () => {
    const tabs = document.querySelector(".automation-tabs");
    if (tabs) {
      tabs.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="automation-app-container">
      <div className="automation-header">
        <div className="automation-title-wrapper">
          <h1 className="automation-title">Automation Practice Quiz</h1>
          <div className="automation-retest-wrapper">
            <button
              className={`automation-retest-btn${!hasResults ? " disabled" : ""}`}
              type="button"
              onClick={hasResults ? handleRetest : undefined}
              disabled={!hasResults}
            >
              Retest
            </button>
          </div>
        </div>
        <div className="automation-results-top">
          {hasResults && (
            <>
              <PieChart correct={correct} total={total} />
              <div className="automation-score-top">
                {passed ? (
                  <span className="automation-pass">You are a machine! 🤖</span>
                ) : (
                  <span className="automation-fail">Keep practicing!</span>
                )}
                <div>
                  Score: {correct} / {total} ({Math.round((correct / total) * 100)}%)
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="automation-tabs">
        {TABS.map((t, idx) => (
          <button
            key={t}
            className={`automation-tab-btn${tab === idx ? " active" : ""}`}
            onClick={() => setTab(idx)}
            disabled={submitted}
            type="button"
          >
            {t}
          </button>
        ))}
      </div>
      <form
        className="automation-quiz-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {QUIZ[TABS[tab]].map((q, idx) => (
          <div className="automation-question-card" key={q.question}>
            <div className="automation-question">{q.question}</div>
            <div className="automation-options">
              {q.options.map((opt, oidx) => (
                <label key={oidx} className="automation-radio-label">
                  <input
                    type="radio"
                    name={`q-${tab}-${idx}`}
                    value={oidx}
                    checked={answers[tab][idx] === oidx}
                    disabled={submitted}
                    onChange={() => handleChange(tab, idx, oidx)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {!submitted && (
          <button
            className={`automation-send-btn${allAnswered ? "" : " disabled"}`}
            type="submit"
            disabled={!allAnswered}
          >
            Send
          </button>
        )}
        {/* Arrow always visible below Send */}
        <div className="automation-scroll-top" onClick={scrollToTabs}>
          <span className="automation-arrow">&#8679;</span>
          <span className="automation-scroll-label">
            Go to question sections
          </span>
        </div>
        {submitted && (
          <div style={{ height: "2.5rem" }} />
        )}
      </form>
    </div>
  );
}