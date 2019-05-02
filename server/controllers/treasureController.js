module.exports = {
	dragontreasure: async (req,res) => {
		const treasure = await req.app.get('db').get_dragon_treasure(1)
		return res.status(200).send(treasure)
	},

	getUserTreasure: async (req,res) => {
		console.log(1111111111111111, req.session.user.id)
		const userTreasure = await req.app.get('db').get_user_treasure([req.session.user.id])
		console.log(userTreasure)
		return res.status(200).send(userTreasure)
	}
}