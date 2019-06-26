import React from 'react';
import { Button, Icon, Upload, message } from 'antd';

const props = {
    name: 'file' + Math.random(),
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        // authorization: 'authorization-text',
    },
    beforeUpload: file => {
        const reader = new FileReader();

        reader.onload = e => {
            console.log('the file content', e.target.result);
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
    }

};

class UploadFile extends React.Component {

    render() {
    	const {
    		ipfsNode,
    		selectedPeer
    	} = this.props;

        return (
            <Upload
            name={`file.${Math.random()}`}
            beforeUpload={(file)=>{
            	const reader = new FileReader();

	            reader.onload = async (e) => {
	                let ipfsLink = await ipfsNode.uploadFile(`file.${Math.random()}`, e.target.result);

	                setTimeout(()=>{
	           			
	           			if(selectedPeer == 'global')
							ipfsNode.sendNewMsg('global', `<a target='_blank' href='${ipfsLink}'> ${file.name} </a>`);
		                else
							ipfsNode.sendNewMsg('private-chat', `${selectedPeer}:<a target='_blank' href='${ipfsLink}'> ${file.name} </a>`);

	                },1000)
	    
	            };
	            reader.readAsText(file);

	            // Prevent upload
	            return false;
            }}
            >
		    <Button>
		      <Icon type="upload" /> Click to Upload
		    </Button>
		  </Upload>)
    }
}

export default UploadFile;