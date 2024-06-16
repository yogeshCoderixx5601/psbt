import { IPayment } from '@/types';
import { generateUnsignedPsbtForInscription } from '@/utils/psbt';
import { NextRequest, NextResponse } from 'next/server';

interface PaymentDetails {
  [key: string]: string; // Define an index signature to allow any string key with string values
}

export async function POST(req: NextRequest) {
  try {
    const {walletDetails, submittedData} = await req.json();
console.log(walletDetails,"wallet details")
    const {cardinal_address, cardinal_pubkey, wallet} = walletDetails;
    if (
        !cardinal_address ||
        !cardinal_pubkey ||
        !wallet 
      ) {
        throw Error("Items missing");
      }
  
      let inscriptions: any = {
          cardinal_address,
          cardinal_pubkey,
          wallet,
          status: "payment pending",
          fee_rate: 262,
          privkey: "", // Default value for privkey
          inscription_address: "", // Default value for inscription_address
          txid: "", // Default value for txid
          inscription_fee: 0, // Default value for inscription_fee
          inscription_id: "", // Default value for inscription_id
          network: "testnet",
          submittedData
      };

      const { psbt } = await generateUnsignedPsbtForInscription(
        cardinal_address,
        cardinal_pubkey,
        inscriptions.fee_rate,
        wallet,
        submittedData,
        "testnet",
      );
      
    return NextResponse.json({ message: 'Data received and processed successfully.',psbt });
  } catch (error) {
    console.error('Error handling form data:', error);
    return NextResponse.json('Error handling form data');
  }
}
