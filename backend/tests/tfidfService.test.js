import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeSkill,
  rankFreelancers,
  tokenize
} from "../services/tfidfService.js";

test("normalizeSkill maps common aliases to a shared canonical form", () => {
  assert.equal(normalizeSkill("React.js"), "react");
  assert.equal(normalizeSkill("ReactJS"), "react");
  assert.equal(normalizeSkill("Node.js"), "nodejs");
  assert.equal(normalizeSkill("Node JS"), "nodejs");
});

test("tokenize removes filler words and preserves meaningful normalized terms", () => {
  const tokens = tokenize("Looking for an experienced React.js developer with strong Node.js knowledge");

  assert.ok(tokens.includes("react"));
  assert.ok(tokens.includes("nodej"));
  assert.ok(!tokens.includes("for"));
  assert.ok(!tokens.includes("developer"));
  assert.ok(!tokens.includes("strong"));
});

test("rankFreelancers prioritizes the strongest skill match", () => {
  const job = {
    description: "Need React Node.js developer for dashboard and API work",
    requiredSkills: ["React.js", "Node.js"],
    minScore: 0
  };

  const freelancers = [
    {
      _id: "best-fit",
      userId: { name: "Best Fit" },
      skills: ["React", "NodeJS", "MongoDB"],
      hourlyRate: 25
    },
    {
      _id: "partial-fit",
      userId: { name: "Partial Fit" },
      skills: ["ReactJS", "Express.js", "JavaScript"],
      hourlyRate: 20
    },
    {
      _id: "unrelated",
      userId: { name: "Unrelated" },
      skills: ["Python", "Django"],
      hourlyRate: 30
    }
  ];

  const results = rankFreelancers(job, freelancers, 3);

  assert.equal(results[0].freelancerId, "best-fit");
  assert.deepEqual(results[0].matchedSkills, ["react", "nodejs"]);
  assert.equal(results[1].freelancerId, "partial-fit");
  assert.equal(results[2].freelancerId, "unrelated");
  assert.ok(results[0].scores.final > results[1].scores.final);
  assert.ok(results[1].scores.final > results[2].scores.final);
});

test("rankFreelancers filters out weak matches by default minScore", () => {
  const job = {
    description: "Build a React dashboard with Node.js APIs",
    requiredSkills: ["React", "Node.js"]
  };

  const freelancers = [
    {
      _id: "good-fit",
      userId: { name: "Good Fit" },
      skills: ["ReactJS", "NodeJS"],
      hourlyRate: 22
    },
    {
      _id: "weak-fit",
      userId: { name: "Weak Fit" },
      skills: ["Copywriting", "SEO"],
      hourlyRate: 18
    }
  ];

  const results = rankFreelancers(job, freelancers, 10);

  assert.equal(results.length, 1);
  assert.equal(results[0].freelancerId, "good-fit");
  assert.ok(results[0].scores.final >= 0.15);
});
