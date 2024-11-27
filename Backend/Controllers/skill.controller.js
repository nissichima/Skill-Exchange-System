import Skill from "../models/skill.model.js";

/**
 * Controller to create a new skill
 */
export const createSkill = async (req, res) => {
  try {
    const { skillName, category, offeringUser, details } = req.body;

    // Validate input
    if (!skillName || !category || !offeringUser || !details) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the skill already exists for the offering user
    const existingSkill = await Skill.findOne({ skillName, offeringUser });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists for this user." });
    }

    // Create and save the new skill
    const newSkill = new Skill({ skillName, category, offeringUser, details });
    await newSkill.save();

    res.status(201).json({ message: "Skill created successfully.", skill: newSkill });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ message: "Failed to create skill.", error });
  }
};

/**
 * Controller to find skills based on query parameters
 */
export const findSkill = async (req, res) => {
  try {
    const { skillName, category, offeringUser } = req.query;

    // Build query dynamically based on parameters provided
    const query = {};
    if (skillName) query.skillName = skillName;
    if (category) query.category = category;
    if (offeringUser) query.offeringUser = offeringUser;

    // Fetch skills matching the query
    const skills = await Skill.find(query);

    if (skills.length === 0) {
      return res.status(404).json({ message: "No skills found matching the criteria." });
    }

    res.status(200).json({ message: "Skills found.", skills });
  } catch (error) {
    console.error("Error finding skills:", error);
    res.status(500).json({ message: "Failed to find skills.", error });
  }
};
