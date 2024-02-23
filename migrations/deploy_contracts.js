const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting, ['Candidate1', 'Candidate2', 'Candidate3']); // 假设有三个候选人
};
