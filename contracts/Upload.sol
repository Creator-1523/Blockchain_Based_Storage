//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.0 <0.9.0;

contract Upload{
    struct Access{
      address user;
      bool access;  
    }

    mapping(address=> string[])value; //to store urls
    mapping (address=> string[])textvalue;
    mapping(address=>mapping(address=>bool))owenership; 
    mapping (address=>Access[])public accessList; //to give owenership
    mapping (address=>mapping (address=>bool))previousData;


    function add(address _user,string calldata url) external {
        value[_user].push(url);
    }
    function addText(address _user,string calldata text) external {
        textvalue[_user].push(text);
    }


    function allow(address user) external {
        owenership[msg.sender][user]=true;
        if(previousData[msg.sender][user]==true){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
        accessList[msg.sender].push(Access(user,true));
        previousData[msg.sender][user]=true;
        }

     

    }
     function disallow(address user) external {//revoking 
        owenership[msg.sender][user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=false;
                }
            }

        

    }
    function display(address _user) external view returns (string[] memory){
        require(_user==msg.sender || owenership[_user][msg.sender],"You dont have access");
        return value[_user];
    }
    function displayText(address _user) external view returns (string[] memory){
        require(_user==msg.sender || owenership[_user][msg.sender],"You dont have access");
        return textvalue[_user];
    }

    function shareAccess() public view returns(Access[] memory) {
        return accessList[msg.sender];

    }


}