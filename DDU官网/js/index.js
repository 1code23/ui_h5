document.write('<script src="js/crypto2.js" type="text/javascript" charset="utf-8"></script>');
document.write('<script src="js/crypto4.js" type="text/javascript" charset="utf-8"></script>');
const cipherMode = 0 // 1 - C1C3C2，0 - C1C2C3，默认为1
const publicKey = "04a419bbc2b68b57f8317e1f1ba22834eb52bf18958e4fd87c5b246551944888df829c2d432512eb8302f635a6224367dffad9dc930e7b1a1ffd27b7757a4b59d0"
const privateKey = "3e5bab8a07c0b6081938edccea765a1afed6e726d9720ca624c927214b0cf4af"

const key = "5Y*^m&a5amDuq^@$" // 长度为16的字符串

function sm4KeyToHex(key) {
	let keyHex = ""
	for (let i = 0, len = key.length; i < len; i++) {
		let ascii = key.substr(i, 1).charCodeAt()
		keyHex += ascii.toString(16)
	}
	return keyHex
}

function encrypt2(msgString) {
	return sm2.doEncrypt(msgString, publicKey, cipherMode)
}

function decrypt2(encryptData) {
	if (encryptData.indexOf("04") === 0) {
		encryptData = encryptData.slice(2)
	}
	return sm2.doDecrypt(encryptData, privateKey, cipherMode)
}

function sign(msg) {
	return sm2.doSignature(msg, privateKey, {
		hash: true,
		der: true
	})
}

function verifySign(msgString, signValueHex) {
	return sm2.doVerifySignature(msgString, signValueHex, publicKey, {
		hash: true,
		der: true
	})
}

function encrypt4(msgString, mode) {
	let option = {}
	if (!!!mode) {
		option.mode = mode
	}
	let encryptHex = sm4.encrypt(msgString, sm4KeyToHex(key), option)
	return hexToBase64(encryptHex)
}

function decrypt4(encryptData, mode) {
	encryptData = base64ToHex(encryptData)
	let option = {}
	if (!!!mode) {
		option.mode = mode
	}
	return sm4.decrypt(encryptData, sm4KeyToHex(key), option)
}

function hexToBase64(encryptHex) {
	let n;
	var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64_rep = "";
	var cnt = 0;
	var bit_arr = 0;
	var bit_num = 0;

	for (n = 0; n < encryptHex.length; ++n) {
		if (encryptHex[n] >= 'A' && encryptHex[n] <= 'Z') {
			ascv = encryptHex.charCodeAt(n) - 55;
		} else if (encryptHex[n] >= 'a' && encryptHex[n] <= 'z') {
			ascv = encryptHex.charCodeAt(n) - 87;
		} else {
			ascv = encryptHex.charCodeAt(n) - 48;
		}

		bit_arr = (bit_arr << 4) | ascv;
		bit_num += 4;
		if (bit_num >= 6) {
			bit_num -= 6;

			base64_rep += digits[bit_arr >>> bit_num];
			bit_arr &= ~(-1 << bit_num);
		}
	}

	if (bit_num > 0) {
		bit_arr <<= 6 - bit_num;
		base64_rep += digits[bit_arr];
	}
	var padding = base64_rep.length % 4;

	if (padding > 0) {
		for (let n = 0; n < 4 - padding; ++n) {
			base64_rep += "=";
		}
	}
	return base64_rep;
}

const base64ToHex = (() => {
	// Lookup tables
	const values = [], output = [];

	// Main converter
	return function base64ToHex(txt, sep = '') {
		if (output.length <= 0) populateLookups();
		const result = [];
		let v1, v2, v3, v4;
		for (let i = 0, len = txt.length; i < len; i += 4) {
			// Map four chars to values.
			v1 = values[txt.charCodeAt(i)];
			v2 = values[txt.charCodeAt(i + 1)];
			v3 = values[txt.charCodeAt(i + 2)];
			v4 = values[txt.charCodeAt(i + 3)];
			// Split and merge bits, then map and push to output.
			result.push(
				output[(v1 << 2) | (v2 >> 4)],
				output[((v2 & 15) << 4) | (v3 >> 2)],
				output[((v3 & 3) << 6) | v4]
			);
		}
		// Trim result if the last values are '='.
		if (v4 === 64) result.splice(v3 === 64 ? -2 : -1);
		return result.join(sep);
	};

	function populateLookups() {
		const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		for (let i = 0; i < 256; i++) {
			output.push(('0' + i.toString(16)).slice(-2));
			values.push(0);
		}
		for (let i = 0; i < 65; i++)
			values[keys.charCodeAt(i)] = i;
	}
})();

