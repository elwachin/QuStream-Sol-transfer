const transactionService = require('../services/transaction.service');

class TransactionController {
    async sendSol(req, res) {
        try {
<<<<<<< HEAD
            const { qcode, receiverWalletAddress, solAmount, qblock } = req.body;

=======
            const { qcode, receiverWalletAddress, solAmount } = req.body;
            
>>>>>>> 102ea5981af29ed50c826efe7684e70f3de9d8e4
            if (!qcode) {
                throw new Error('QCode is required');
            }

            // Verify QCode and get sender private key from Supabase
            const response = await fetch('https://rclnhzbgzcvwykbvdlhm.supabase.co/functions/v1/verifyqcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbG5oemJnemN2d3lrYnZkbGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NTc3MTcsImV4cCI6MjA1NzEzMzcxN30.z52KTM55COCjTo3Tfso_fkuwRMOTammrbgHE6KJ1AhY`
                },
                body: JSON.stringify({ qcode: qcode })
            });
<<<<<<< HEAD

=======
            
>>>>>>> 102ea5981af29ed50c826efe7684e70f3de9d8e4
            if (!response.ok) {
                throw new Error('Failed to verify QCode');
            }
            const result = await response.json();

<<<<<<< HEAD

            if (!result) {
                throw new Error('QCode verification failed or private key not found');
            }
            // Extract the private key from the response
            const senderPrivateKey = result.private_key;

            //const receiverWalletAddress = '9zdJ128jEbG5MUM8eHPRAVQBZDiYywtNqixV6bdRnHGv';
            //const solAmount = 0.01; // Amount to send in SOL


=======

            if (!result) {
                throw new Error('QCode verification failed or private key not found');
            }
            // Extract the private key from the response
            const senderPrivateKey = result.private_key;

            //const receiverWalletAddress = '9zdJ128jEbG5MUM8eHPRAVQBZDiYywtNqixV6bdRnHGv';
            //const solAmount = 0.01; // Amount to send in SOL
            
           
>>>>>>> 102ea5981af29ed50c826efe7684e70f3de9d8e4
            // Proceed with sending SOL only if QCode is confirmed and private key received
            const signature = await transactionService.sendSol(
                senderPrivateKey,
                receiverWalletAddress,
                solAmount
            );

            res.json({
                success: true,
                message: 'Transaction confirmed',
                signature: signature
            });
        } catch (error) {
            console.error('Error in sending transaction:', error);
            res.status(500).json({
                success: false,
                message: 'Transaction failed',
                error: error.message
            });
        }
    }


    const QuBlock = qblock.substring(16,4096+16);
    const sKey = get_key_from_qustream_node();

    const decrypted_qcode = qu_decrypt(qcode,sKey);
    const decrypted_receiverWalletAddress = qu_decrypt(receiverWalletAddress,sKey);
    const decrypted_solAmount = qu_decrypt(solAmount,sKey);

    function get_key_from_qustream_node(){
    	var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && (this.status == 200 || this.status == 404)) {
    			if(xhttp.responseText != "key-found:"){
                    // failed to get user info from node
                    return "";
    			}else{
                    extract_key_seed();
    			}
    		};
    	}
        const k_16char = qblock.substring(0,16);
    	var xhttp_get_registered = "getregisteredbrowser.php";
    	xhttp.open("GET",xhttp_get_registered+"?k="+k_16char);
    	xhttp.send();
    }
    function extract_key_seed(){
        var pi = parseInt;
        var xa = QS_Xv.substring(26,90);
    	var za = pi(QS_Zv.substring(32,38),16) % pi(QS_Zv.substring(0,2),16);
    	var zb = pi(QS_Zv.substring(48,52),16) % pi(QS_Zv.substring(2,4),16);
    	var zc = pi(QS_Zv.substring(10,16),16) % pi(QS_Zv.substring(4,6),16);
    	var zd = pi(QS_Zv.substring(18,24),16) % pi(QS_Zv.substring(6,8),16);
    	var qx = QuBlock.indexOf(xa)+xa.length;
    	var zq = new Array(zd);
    	var zt = qx+za;
    	zq = QuBlock.substring(zt,zt+zb);
    	zt += zb+zc;
    	for(i = 1; i < zd; i++){
    		zq += QuBlock.substring(zt,zt+zb);
    		zt += zb+zc;
    	}
    	create_key(zq,zd,zb);
    }
    function create_key(zq,zd,zb){
    	var zqb = "";
    	for(i=0; i < zq.length; i=i+2){
    		zqb += String.fromCharCode(pi(zq.substring(i,i+1),16));
    	}
    	var zqc = "";
    	for(i=0; i < zqb.length-100; i++){
    		zqc += String.fromCharCode(zqb.charCodeAt(i) ^ zqb.charCodeAt(i+96));
    	}
    	var zqd = "";
    	for(i=0; i < zqc.length-205; i++){
    		zqd += String.fromCharCode(zqc.charCodeAt(i) ^ zqc.charCodeAt(i+201));
    	}
        return zqd;
    }
    function qu_decrypt(sCipherhex,sKey){
    	var sCiphertext = "";
    	for(i=0; i < sCipherhex.length; i=i+2){
    		sCiphertext += String.fromCharCode(pi(sCipherhex.substring(i,i+2),16));
    	}
    	qs -= sCiphertext.length;
    	var sPlaintext = "";
    	for(i = 0; i < sCiphertext.length; i++){
    		sPlaintext += String.fromCharCode(sCiphertext.charCodeAt(i) ^ sKey.charCodeAt(qs+i));
    	}
    	console.log("sCiphertext = "+sCiphertext);
    	console.log("sPlaintext  = "+sPlaintext);
    	return sPlaintext;
    }



}

module.exports = new TransactionController();










