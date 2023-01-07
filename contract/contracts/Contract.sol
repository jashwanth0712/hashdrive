// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    string[] file_names;
    string[] cids;

    function get_cid(string memory file_name)
     public view returns(string memory) {
         for(uint i=0;i<get_files_Count();i++){
                if (keccak256(abi.encodePacked(file_name)) == keccak256(abi.encodePacked(file_names[i]))){
                    return cids[i];
                }
            }
        return "error";
    }
    function put_file(string memory file_name, string memory cid)
        public {
            file_names[file_names.length]=file_name;
            cids[get_cid_Count()]=cid;
        }
    function get_files_Count() public view returns(uint count) {
        return file_names.length;
    }
    
    function get_cid_Count() public view returns(uint count) {
        return cids.length;
    }
}