window.addEventListener('load', async () => {
    // 连接到以太坊节点
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.error("No web3 detected. You should consider using MetaMask.");
    }

    // 获取智能合约实例
    const contractAddress = '0x...'; // 替换为你部署的智能合约地址
    const contractABI = [...]; // 替换为你的智能合约 ABI
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // 显示候选人列表和投票表单
    const candidatesDiv = document.getElementById('candidates');
    const candidateList = ['Candidate1', 'Candidate2', 'Candidate3']; // 假设有三个候选人
    candidateList.forEach(async (candidate) => {
        const candidateElement = document.createElement('div');
        candidateElement.textContent = candidate;
        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.addEventListener('click', async () => {
            await vote(candidate);
        });
        candidateElement.appendChild(voteButton);
        candidatesDiv.appendChild(candidateElement);
    });

    // 投票函数
    async function vote(candidate) {
        try {
            const accounts = await web3.eth.getAccounts();
            const result = await contract.methods.voteForCandidate(web3.utils.asciiToHex(candidate)).send({ from: accounts[0] });
            console.log(result);
            alert('Vote successful!');
        } catch (error) {
            console.error(error);
            alert('Error occurred while voting!');
        }
    }
});
