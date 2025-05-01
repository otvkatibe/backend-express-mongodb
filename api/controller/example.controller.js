const SecuredExample = (req, res) => {
    console.log("Secured example controller accessed");
    res.status(200).json({ message: 'This is a secured endpoint' });
}

export default { SecuredExample };