const User = require('../../models/user');

const updateUser = async (req, res) => {
    const { walletAddress } = req.params;
    const updateData = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { WalletAddress: walletAddress },
            updateData,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

module.exports = updateUser;
