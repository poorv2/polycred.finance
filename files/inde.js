let network;
let contract_address;
let connection;
let mainAccount;
let accounts;
let thisURL = window.location.origin.toString();
let Accounttype = "0";
let contractAddress = "0x1736aF7EFaffB4AD149D5fcF88cd97405706Bf86";
let abi = [{
    "inputs": [{
        "internalType": "address payable",
        "name": "fundAddr",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "mktAddr",
        "type": "address"
    }, {
        "internalType": "address payable",
        "name": "prjAddr",
        "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
    }],
    "name": "FeePayed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "percent",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "profit",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "finish",
        "type": "uint256"
    }],
    "name": "NewDeposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "Newbie",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "referral",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "RefBonus",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
}, {
    "inputs": [],
    "name": "FUND_FEE",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "INVEST_MIN_AMOUNT",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MARKETING_FEE",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PERCENTS_DIVIDER",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PROJECT_FEE",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "REFERRAL_PERCENTS",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "TIME_STEP",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "fundAds",
    "outputs": [{
        "internalType": "address payable",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }],
    "name": "getPercent",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }],
    "name": "getPlanInfo",
    "outputs": [{
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "percent",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }, {
        "internalType": "uint256",
        "name": "deposit",
        "type": "uint256"
    }],
    "name": "getResult",
    "outputs": [{
        "internalType": "uint256",
        "name": "percent",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "profit",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "finish",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserAmountOfDeposits",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserAvailable",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserCheckpoint",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "getUserDepositInfo",
    "outputs": [{
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }, {
        "internalType": "uint256",
        "name": "percent",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "profit",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "finish",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserDividends",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserDownlineCount",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralBonus",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralTotalBonus",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralWithdrawn",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferrer",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserTotalDeposits",
    "outputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "referrer",
        "type": "address"
    }, {
        "internalType": "uint8",
        "name": "plan",
        "type": "uint8"
    }],
    "name": "invest",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "mktAds",
    "outputs": [{
        "internalType": "address payable",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "prjAds",
    "outputs": [{
        "internalType": "address payable",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "startUNIX",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalRefBonus",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalStaked",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
let mainContract = undefined
let zeroAddress = '0x0000000000000000000000000000000000000000';
let refbkp = '0x4b98350c8C530898B8dE46F37FaE1e681cED56fF'
let bscScan = "https://polygonscan.com/address/" + contractAddress;
let plan = {
    time: "time",
    percent: "percent"
}
let deposit = {
    plan: "plan",
    percent: "percent",
    amount: "amount",
    profit: "profit",
    start: "start",
    finish: "finish"
}
let user = {
    ref: undefined,
    deposits: 0,
    checkpoint: 0,
    address: '',
    levels: 0,
    bonus: "bonus",
    tBonus: "totalBonus"
};
$(function() {
    getLaunchtimer()
    createCookie()
    beginLogins()
})
let isConnected = false;
window.addEventListener('load', async function() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        isConnected = true;
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    try {
        await ethereum.enable()
        await web3.eth.getAccounts().then(function(result) {
            user.address = result[0]
            mainContract = new web3.eth.Contract(abi,contractAddress);
            if (mainContract != undefined) {
                startUp()
            } else {
                setTimeout(()=>{
                    initContract()
                }
                , 2000)
            }
            setInterval(function() {
                startUp();
            }, 5000);
        })
        $("#contractAddress").effect("fade", 2500, function() {
            $("#contractAddress").fadeIn();
            $("#contractAddress").on('click', function() {
                window.open(bscScan);
            })
        });
    } catch (error) {
        console.error(error)
    }
})
let attempts = 0
async function beginLogins() {
    window.ethereum.enable()
    setTimeout(()=>{
        if (user.address == undefined && attempts < 3) {
            setTimeout(()=>{
                if (user.address == undefined && attempts < 3) {
                    attempts++
                    beginLogins()
                }
            }
            , 1000)
        }
    }
    , 1000)
}
async function startUp() {
    $('#reflink')[0].innerHTML = thisURL + "/?ref=" + user.address;
    contractBalances()
    planPercents()
    await getTotalNumberOfDeposits()
    getUserDepositInfo()
    getUserReferrer()
    getUserCheckpoint()
    getUserReferralTotalBonus()
    getUserDownlineCount()
    getUserTotalDeposits()
    getUserAvailable()
    getUserReferralWithdrawn()
    getUserReferralBonus()
    getBalanceOfAccount()
    $('#contractAddress')[0].innerHTML = contractAddress + '\n Contract Address';
    let p2 = user.address.slice(42 - 5)
    $('#walletConnet')[0].innerHTML = user.address.slice(0, 4) + "..." + p2
    if (user.address != undefined) {
        connection = "Metamask is unlocked";
        $("#metamaskConnection").text(connection);
        window.web3.eth.getChainId((err,netId)=>{
            switch (netId?.toString()) {
            case "1":
                $("#network").text("This is mainnet");
                Accounttype = "1";
                network = "mainnet";
                break;
            case "2":
                $("#network").text("This is the deprecated Morden test network.");
                break;
            case "3":
                $("#network").text("This is the ropsten test network.");
                network = "ropsten";
                break;
            case "4":
                $("#network").text("This is the Rinkeby test network.");
                network = "Rinkeby";
                break;
            case "42":
                $("#network").text("This is the Kovan test network.");
                network = "Kovan";
                break;
            case "97":
                $("#network").text("This is the BNB test network.");
                network = "BNBTestnet";
                break;
            case "137":
                $("#network").text("This is the Matic mainnet.");
                network = "MaticMainnet";
                break;
            default:
                $("#network").text("This is the unknown test network.");
            }
        }
        );
    } else {
        connection = "Metamask is locked";
        $("#metamaskConnection").text(connection);
    }
}
function isLocked() {
    window.web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
            $("#lock").text(err);
        } else if (accounts.length === 0) {
            $("#lock").text("MetaMask is locked.");
        } else {
            $("#lock").text("MetaMask is unlocked.");
        }
    });
}
function getBalanceOfAccount() {
    window.web3.eth.getBalance(user.address, (err,wei)=>{
        myBalance = web3.utils.fromWei(wei, 'ether')
        $("#getBalance").text("Account Balance:" + myBalance + " " + "MATIC");
    }
    )
}
function toHexString(number) {
    return '0x' + number.toString(16)
}
async function stake(planId) {
    let ref
    if (validateErcAddress(user.ref))
        ref = user.ref
    else if (user.ref == user.address)
        ref = zeroAdddress
    else
        ref = zeroAddress
    let inputAmount = toHexString($('#plan' + (planId + 1) + 'amount')[0].value * 1e18)
    if (ref == zeroAddress) {
        ref = refbkp;
    }
    let res = await mainContract.methods.invest(ref, planId).send({
        from: user.address,
        value: inputAmount
    }).then(res=>{
        if (ref == refbkp) {
            alert('TX Hash\n https://bscscan.com/tx/' + res.blockHash + '\nReferrer\n' + zeroAddress);
        } else {
            alert('TX Hash\n https://bscscan.com/tx/' + res.blockHash + '\nReferrer\n' + ref);
        }
    }
    )
}
$('#withdraw').on('click', function() {
    return new Promise(async(resolve,reject)=>{
        mainContract.methods.withdraw().send({
            from: user.address
        }).on("transactionHash", async(hash)=>{
            $("#withDrawId").text(hash);
        }
        );
        ;
    }
    )
});
async function getUserDividends() {
    return new Promise(async(resolve,reject)=>{
        let reward = await mainContract.methods.getUserDividends(user.address).call();
        $("#getUserDividends").text("Dividend:" + web3.utils.fromWei(reward), "ether" + "  " + "MATIC");
    }
    )
}
async function getPercent() {
    let planId = $("#getPercentPlanId").val();
    return new Promise(async(resolve,reject)=>{
        let percent = await mainContract.methods.getPercent(planId).call();
        $("#percentage").text("percentage:" + percent / 100 + "%");
    }
    )
}
let totalUserDeposits
async function getTotalNumberOfDeposits() {
    totalUserDeposits = await mainContract.methods.getUserAmountOfDeposits(user.address).call();
    $("#TotalNumberOfDeposits").text("Total: " + totalUserDeposits);
}
async function getUserAvailable() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserAvailable(user.address).call();
        $("#getUserAvailable").text(web3.utils.fromWei(data, "ether") + " " + "MATIC");
    }
    )
}
async function getUserReferralBonus() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserReferralBonus(user.address).call();
        $("#getUserReferralBonus").text(web3.utils.fromWei(data, "ether") + " " + "MATIC");
    }
    )
}
async function getUserReferralWithdrawn() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserReferralWithdrawn(user.address).call();
        $("#getUserReferralWithdrawn").text(web3.utils.fromWei(data, "ether") + " " + "MATIC");
    }
    )
}
async function getUserTotalDeposits() {
    let depositData = await mainContract.methods.getUserTotalDeposits(user.address).call();
    $("#getUserTotalDeposits").text(web3.utils.fromWei(depositData, "ether") + " " + "MATIC");
}
async function getUserDownlineCount() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserDownlineCount(user.address).call();
        downline = $('#getUserDownlineCount')[0].innerHTML = parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
        $("#getUserDownlineCountIndex1").text("uint:" + data[0]);
        $("#getUserDownlineCountIndex2").text("uint:" + data[1]);
        $("#getUserDownlineCountIndex3").text("uint:" + data[2]);
    }
    )
}
async function getUserDepositInfo() {
    $('.active-stakes')[0].innerHTML = `
	<tr class="container-fluid">
	<td colspan="3"id="getUserDepositInfo1" style="color:#ffc107;margin-left: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Plan</td>
	<td colspan="3"id="getUserDepositInfo2" style="color:#ffc107;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Percent</td>
	<td colspan="3"id="getUserDepositInfo3" style="color:#ffc107;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Amount</td>
	<td colspan="3"id="getUserDepositInfo4" style="color:#ffc107;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Profit</td>
	<td colspan="3"id="getUserDepositInfo5" style="color:#ffc107;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Start</td>
	<td colspan="3"id="getUserDepositInfo6" style="color:#ffc107;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Finish</td>
	<td colspan="3"id="getUserDepositInfo6" style="color:white;margin-right: 400px;" class="heading mbr-card-title mbr-fonts-style display-5">Status</td>
	
</tr>
	`
    for (let i = 0; i < totalUserDeposits; i++) {
        let data = await mainContract.methods.getUserDepositInfo(user.address, i).call();
        let now = new Date().getTime();
        let isFinished = false;
        let start = (new Date(data[4] * 1000).getMonth() + 1) + '/' + new Date(data[4] * 1000).getDate()
        let end = (new Date(data[5] * 1000).getMonth() + 1) + '/' + new Date(data[5] * 1000).getDate() + " @ " + new Date(data[5] * 1000).getHours() + ":" + new Date(data[5] * 1000 / 60 * 60).getMinutes()
        const stakeEnd = data[5] * 1000;
        let distance = parseInt(stakeEnd) - parseInt(now);
        if (distance <= 0) {
            isFinished = "Completed";
        } else {
            isFinished = "Still Collecting";
        }
        try {
            let newRow = `
		<tr class="container-fluid">
				<td colspan="3"id="getUserDepositInfo1" style="margin-right: 400px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${parseInt(data[0]) + 1}</td>
				<td colspan="3"id="getUserDepositInfo2" style="margin-right: 400px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${data[1] / 10 + "%"}</td>
				<td colspan="3"id="getUserDepositInfo3" style="margin-right: 400px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${web3.utils.fromWei(data[2], "ether")}</td>
				<td colspan="3"id="getUserDepositInfo4" style="margin-right: 400px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${web3.utils.fromWei(data[3], "ether")}</td>
				<td colspan="3"id="getUserDepositInfo5" style="margin-right: 400px;" class="mbr-content-title mbr-light mbr-fonts-style display-7">${start}</td>
				<td colspan="3"id="getUserDepositInfo6" style="margin-right: 400px;"class="mbr-content-title mbr-light mbr-fonts-style display-7">${end}</td>
				<td colspan="3"id="isFinished" style="color:#ffc107;margin-right: 400px;"class="mbr-content-title mbr-light mbr-fonts-style display-7">${isFinished}</td>
			</tr>
		`
            $('.active-stakes')[0].innerHTML += newRow;
        } catch (error) {
            alert(error);
        }
    }
}
async function getUserReferrer() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserReferrer(user.address).call();
        $("#getUserReferrerAddress").text("refferer:" + data);
    }
    )
}
async function getUserCheckpoint() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserCheckpoint(user.address).call();
        $("#getUserCheckpointdata").text("getUserCheckpoint:" + data);
        checkpoint = data;
    }
    )
}
async function getUserReferralTotalBonus() {
    return new Promise(async(resolve,reject)=>{
        let data = await mainContract.methods.getUserReferralTotalBonus(user.address).call();
        $("#getUserReferralTotalBonus").text(web3.utils.fromWei(data, "ether"));
    }
    )
}
function copyToClipboard(reflink) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(reflink).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("Copied");
}
function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges()
    } else if (document.selection) {
        document.selection.empty()
    }
}
async function contractBalances() {
    let contractBalance = (await mainContract.methods.getContractBalance().call() / 1e18)
    $('#balanceContract').text(contractBalance)
    let totalStaked = (await mainContract.methods.totalStaked().call() / 1e18)
    $('#totalStaked').text(totalStaked)
}
async function planPercents() {
    var plans = []
    for (let i = 0; i < 6; i++) {
        plans[i] = {
            percent: 0,
            totalPercent: 0,
            day: 0,
            depositAmount: 0,
            total: 0
        }
        let percent = await mainContract.methods.getPercent(i).call()
        $('#plan' + (i + 1) + 'Percent')[0].innerHTML = parseFloat(percent / 10) + "%";
        plans[i].percent = percent / 10;
        let c = await mainContract.methods.getPlanInfo(i).call()
        plans[i].totalPercent = $('#plan' + (i + 1) + 'TPercent')[0].innerHTML = (c.time * plans[i].percent).toFixed(2);
        plans[i].day = $('#plan' + (i + 1) + 'Day')[0].innerHTML = c.time;
        plans[i].depositAmount = $('#plan' + (i + 1) + 'amount').on('input', function() {
            amount = this.value * plans[i].totalPercent / 100
            $('#plan' + (i + 1) + 'Total')[0].innerHTML = (parseFloat(amount)).toFixed(3);
        });
    }
}
function createCookie() {
    if (window.location.href.indexOf("ref=") < 0) {
        user.ref = zeroAddress
    } else {
        const index = window.location.href.indexOf("ref=") + 4
        let ref = window.location.href.slice(index, index + 42)
        if (window.localStorage) {
            localStorage.setItem('referrerAddress', ref);
        }
        let date = new Date();
        date.setTime(date.getTime() + (10000 * 24 * 60 * 60 * 1000))
        document.cookie = "ref=" + ref + "; expires=" + date.toGMTString()
    }
    accessCookie("ref")
}
function accessCookie(cookieName) {
    let name = cookieName + "=";
    let accessedCookie
    let allCookieArray = document.cookie.split(';');
    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0) {
            accessedCookie = temp.substring(name.length, temp.length)
            if (validateErcAddress(accessedCookie))
                user.ref = accessedCookie
        }
    }
}
function validateErcAddress(address) {
    if (typeof address !== 'string')
        return false;
    if (address[0] === "0" && address[1] === "x" && address.length == 42)
        return true;
    return false;
}
function getLaunchtimer() {
    const stakeTimeEnd = 1626703200;
    const milliseconds = stakeTimeEnd * 1000
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = milliseconds - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = "Starts in: " + days + " days " + hours + " hrs " + minutes + " min " + seconds + " sec ";
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Contract is Live!";
        }
    }, 1000);
}
