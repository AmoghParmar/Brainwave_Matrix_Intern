// // SPDX-LICENSE-IDENTIFIER: UNLICENSED

// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// // import "@openzeppelin/contracts/token/ERC721/extensions/ERC72URIStorage.sol";

// import "hardhat/console.sol";

// contract Create {
//     using Counters for Counters.Counter;

//     Counters.Counter public _voterId;
//     Counters.Counter public _candidateId;

//     address public votingOrganizer; //The one Who will deploy the contract{ownerr}

//     // Candidate for voting
//     struct Candidate {
//         uint256 candidateId;
//         string age; //age of user to applicable for vote we take as input
//         string name;
//         string image; //Image will uploaded thorugh ipfs and will also going to add this images in smart contract
//         uint256 voterCount; //So how many votes the voters are getting
//         address _address; //Id generated from metamassk we take as input
//         string ipfs; //This IPFS contains all the info about the single candidate,  we upload this candidate data to IPFS from where we can fetch and add as URL, So if anybody wass looked detail about this candidate{If anybody needs detailing of the candidate(like age,name,image) so they can find from the link}
//     }

//     // Event is the cheaper way to save data on blockchain
//     event CandidateCreate(
//         uint256  candidateId,
//         string age,
//         string name,
//         string image,
//         uint256 voterCount,
//         address _address,
//         string ipfs
//     );
//     address[] public candidateAddress; //adress of all the candidates will stores in this array

//     mapping(address => Candidate) public candidates;

//     // here is the ENDING OF Candidate Data;

//     // Voter Details or Data
//     address[] public votedVoters; //the voters who voted that data is stored in this array

//     address[] public votersAddress;

//     mapping(address => Voter) public voters;

//     struct Voter {
//         uint256 voter_voterId;
//         string voter_name;
//         string voter_image;
//         address voter_address;
//         uint256 voter_allowed; //age of user to applicable for vote we take as input/He or She give vote or not{Is this Voter is authorized for voting or not }
//         bool voter_voted; //True or false {whether the voter is voted or not}
//         uint256 voter_vote;
//         string voter_ipfs;
//     }

//     event VoterCreated(
//         uint256 indexed voter_voterId,
//         string voter_name,
//         string voter_image,
//         address voter_address,
//         uint256 voter_allowed,
//         bool voter_voted,
//         uint256 voter_vote,
//         string voter_ipfs
//     );

//     // HERE IS THE ENDING OF VOTER-DATA
//     constructor() {
//         votingOrganizer = msg.sender;
//     }

//     function setCandidate(
//         address _address,
//         string memory _age,
//         string memory _name,
//         string memory _image,
//         string memory _ipfs
//     ) public {
//         require(
//             votingOrganizer == msg.sender,
//             "Only the organizer can create the candidate"
//         );

//         _candidateId.increment(); //Everytime we create user this no. will keep updating

//         uint256 idNumber = _candidateId.current();

//         // For changing state variable for our smart contract {Storage}
//         // ANd when you don't changes the state variable in such cases we used MEMORY
//         Candidate storage candidate = candidates[_address];

//         candidate.age = _age;
//         candidate.name = _name;
//         candidate.candidateId = idNumber;
//         candidate.image = _image;
//         candidate.voterCount = 0;
//         candidate._address = _address;
//         candidate.ipfs = _ipfs;

//         candidateAddress.push(_address);

//         emit CandidateCreate(
//             idNumber,
//             _age,
//             _name,
//             _image,
//             candidate.voterCount,
//             _address,
//             _ipfs
//         );
//     }

//     function getCandidate() public view returns (address[] memory) {
//         return candidateAddress;
//     }

//     function getCandidateLength() public view returns (uint256) {
//         candidateAddress.length;
//     }

//     function getCandidatedata(address _address)
//         public
//         view
//         returns (
//             string memory,
//             string memory,
//             uint256,
//             string memory,
//             uint256,
//             string memory,
//             address
//         )
//     {
//         returns (
//             candidates[_address].age,
//             candidates[_address].name,
//             candidates[_address].candidateId,
//             candidates[_address].image,
//             candidates[_address].voterCount,
//             candidates[_address].ipfs,
//             candidates[_address]._address,

//         );
//     }

//     // /VOTER SECTIONNN
//     // Authorization for voters to give there votee
//     function voterRight(
//         address _address,
//         string memory _name,
//         string memory _image,
//         string memory _ipfs
//     ) public {
//         require(
//             votingOrganizer == msg.sender,
//             "Only the organizer can create voter"
//         );
//         _voterId.increment();
//         uint256 idNumber = _voterId.current();

//         Voter storage voter = voters[_address];
//         require(voter.voter_allowed == 0);

//         voter.voter_allowed = 1;
//         voter.voter_name = _name;
//         voter.voter_image = _image;
//         voter.voter_address = _address;
//         voter.voter_voterId = idNumber;
//         voter.voter_vote = 1000;
//         voter.voter_voted = false;
//         voter.voter_ipfs = _ipfs;

//         votersAddress.push(_address);

//         emit VoterCreated(
//             idNumber,
//             _name,
//             _image,
//             _address,
//             voter.voter_allowed,
//             voter.voter_voted,
//             voter.voter_vote,
//             _ipfs
//         );
//     }

//     function vote(address _candidateAddress, uint256 _candidateVoteId)
//         external
//     {
//         Voter storage voter = voters[msg.sender];

//         require(!voter.voter_voted, "you have already voted");
//         require(voter.voter_allowed != 0, "uhh Have no right ot votee");

//         voter.voter_voted = true;
//         voter.voter_vote = _candidateVoteId;

//         votedVoters.push(msg.sender);

//         candidates[_candidateAddress].voteCount += voter.voter_allowed;
//     }

//     function getVoterLength() public view returns (uint256) {
//         return votersAddress.length;
//     }

//     function getVoterdata(address _address)
//         public
//         view
//         returns (
//             uint256,
//             string memory,
//             string memory,
//             address,
//             string memory,
//             uint256,
//             bool
//         )
//     {
//         return (
//             voters[_address].voter_voterId,
//             voters[_address].voter_name,
//             voters[_address].voter_image,
//             voters[_address].voter_address,
//             voters[_address].voter_ipfs,
//             voters[_address].voter_allowed,
//             voters[_address].voter_voted
//         );
//     }

//     function getVotedVoterList() public view returns (address[] memory) {
//         return votedVoters;
//     }

//     function getvoterList() public view returns (address[] memory) {
//         return votersAddress;
//     }
// }

////////////////////////////////////////////////////////////////
/////////======================================////////////////
///////////////////////////////////////////////////////////////

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        require(counter._value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value -= 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC72URIStorage.sol";

import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer; // The one Who will deploy the contract{owner}

    // Candidate for voting
    struct Candidate {
        uint256 candidateId;
        string age; // age of user to applicable for vote we take as input
        string name;
        string image; // Image will uploaded through ipfs and will also going to add this images in smart contract
        uint256 voterCount; // So how many votes the voters are getting
        address _address; // Id generated from metamask we take as input
        string ipfs; // This IPFS contains all the info about the single candidate, we upload this candidate data to IPFS from where we can fetch and add as URL, So if anybody wants to look detail about this candidate
    }

    // Event is the cheaper way to save data on blockchain
    event CandidateCreate(
        uint256 candidateId,
        string age,
        string name,
        string image,
        uint256 voterCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress; // Address of all the candidates will stores in this array

    mapping(address => Candidate) public candidates;

    // here is the ENDING OF Candidate Data;

    // Voter Details or Data
    address[] public votedVoters; // The voters who voted that data is stored in this array

    address[] public votersAddress;

    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed; // Is this Voter is authorized for voting or not
        bool voter_voted; // True or false {whether the voter has voted or not}
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    // HERE IS THE ENDING OF VOTER-DATA
    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        string memory _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only the organizer can create the candidate"
        );

        _candidateId.increment(); // Every time we create user this no. will keep updating

        uint256 idNumber = _candidateId.current();

        // For changing state variable for our smart contract {Storage}
        // And when you don't change the state variable in such cases we use MEMORY
        Candidate storage candidate = candidates[_address];

        candidate.age = _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.image = _image;
        candidate.voterCount = 0;
        candidate._address = _address;
        candidate.ipfs = _ipfs;

        candidateAddress.push(_address);

        emit CandidateCreate(
            idNumber,
            _age,
            _name,
            _image,
            candidate.voterCount,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length; // Add return statement
    }

    function getCandidatedata(address _address)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            address
        )
    {
        Candidate storage candidate = candidates[_address];
        return (
            candidate.age,
            candidate.name,
            candidate.candidateId,
            candidate.image,
            candidate.voterCount,
            candidate.ipfs,
            candidate._address
        ); // Use return instead of returns
    }

    // VOTER SECTION
    // Authorization for voters to give their vote
    function voterRight(
        address _address,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            votingOrganizer == msg.sender,
            "Only the organizer can create voter"
        );
        _voterId.increment();
        uint256 idNumber = _voterId.current();

        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0);

        voter.voter_allowed = 1;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_voterId = idNumber;
        voter.voter_vote = 1000;
        voter.voter_voted = false;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit VoterCreated(
            idNumber,
            _name,
            _image,
            _address,
            voter.voter_allowed,
            voter.voter_voted,
            voter.voter_vote,
            _ipfs
        );
    }

    function vote(address _candidateAddress, uint256 _candidateVoteId)
        external
    {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "you have already voted");
        require(voter.voter_allowed != 0, "you have no right to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);

        candidates[_candidateAddress].voterCount += voter.voter_allowed;
    }

    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }

    function getVoterdata(address _address)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            address,
            string memory,
            uint256,
            bool
        )
    {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_ipfs,
            voters[_address].voter_allowed,
            voters[_address].voter_voted
        );
    }

    function getVotedVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}
