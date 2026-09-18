export const createUser = (req, res) => {
  try {
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "All users retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
