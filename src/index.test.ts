import { PublicKey } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import {
  ARMANIS_WALLET,
  FAKE_SBF,
  KRISPYS_WALLET,
  MIKES_WALLET,
  SECONDS,
  VIDORS_WALLET,
  VLADS_WALLET,
  WALLET_WITH_NO_NAME,
} from './constants';
import {
  dotSolToWalletAddress,
  dotBackpackToWalletAddress,
  dotGlowToWalletAddress,
  dotAnythingToWalletAddress,
  walletNameToAddressAndProfilePicture,
  walletAddressToDotAnything,
  walletAddressToDotGlow,
  walletAddressToDotSol,
  walletAddressToDotBackpack,
  walletAddressToNameAndProfilePicture,
} from '.';
import { connect } from './connect';
import * as dotenv from 'dotenv';

// This is absurdly slow, but is likely a rate limit, ie due ot the amount of requests submitted during unit tests.
// TODO: speak to Bonfida people and confirm.
const BONFIDA_IS_SLOW = 20 * SECONDS;

const log = console.log;

dotenv.config();

let rpcURL: string | null = null;
if (process.env.RPC_URL) {
  rpcURL = process.env.RPC_URL;
}

if (!rpcURL) {
  throw new Error('Please set RPC_URL in .env file');
}

let backpackJWT: string | null = null;
if (process.env.BACKPACK_JWT) {
  backpackJWT = process.env.BACKPACK_JWT;
}

const testOrSkipIfJWTNotSetup = process.env.BACKPACK_JWT ? test : test.skip;

const mikesWallet = new PublicKey(MIKES_WALLET);
const newMikesWallet = new PublicKey(
  'dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8'
);
const krispysWallet = new PublicKey(KRISPYS_WALLET);
const vidorsWallet = new PublicKey(VIDORS_WALLET);
const armanisWallet = new PublicKey(ARMANIS_WALLET);

describe(`wallet names to addresses`, () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await connect(rpcURL);
  });

  // describe(`dotSolDomainToWallet`, () => {
  //   test(`mikemaccana.sol resolves`, async () => {
  //     const walletAddressAndProfilePicture = await dotSolToWalletAddress(
  //       'mikemaccana.sol'
  //     );
  //     expect(walletAddressAndProfilePicture).toEqual({
  //       profilePicture: null,
  //       //walletAddress: '5FHwkrdxntdK24hgQU8qgBjn35Y1zwhz1GZwCkP2UJnM',
  //       walletAddress: 'dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8',
  //     });
  //   });

  //   test(`unregistered-domain-for-unit-tests.sol returns null`, async () => {
  //     const walletAddressAndProfilePicture = await dotSolToWalletAddress(
  //       'unregistered-domain-for-unit-tests.sol'
  //     );
  //     expect(walletAddressAndProfilePicture).toEqual({
  //       profilePicture: null,
  //       walletAddress: null,
  //     });
  //   });
  // });

  describe(`dotBackpackToWalletAddress`, () => {
    test(`armani.backpack resolves`, async () => {
      const walletAddressAndProfilePicture = await dotBackpackToWalletAddress(
        'armani.backpack'
        //backpackJWT
      );
      expect(walletAddressAndProfilePicture).toEqual({
        profilePicture: 'https://swr.xnfts.dev/avatars/armani',
        walletAddress: ARMANIS_WALLET,
      });
    });
  });

  // describe(`dotGlowToWalletAddress`, () => {
  //   test(`mikemaccana.glow resolves`, async () => {
  //     const walletAddressAndProfilePicture = await dotGlowToWalletAddress(
  //       'mikemaccana.glow'
  //     );
  //     expect(walletAddressAndProfilePicture).toEqual({
  //       //profilePicture:'https://cdn.glow.app/g/er/ae01b288-3bc6-4248-ac49-a6b6c6132fb6',
  //       profilePicture:
  //         'https://cdn.glow.app/g/dg/7620b40c-6b78-4711-b0cf-71b5cbbb1080',
  //       walletAddress: MIKES_WALLET,
  //     });
  //   });
  // });

  // describe(`dotAnythingToWalletAddress`, () => {
  //   test(`mikemaccana.abc resolves`, async () => {
  //     const walletAddressAndProfilePicture = await dotAnythingToWalletAddress(
  //       connection,
  //       'mikemaccana.abc'
  //     );
  //     expect(walletAddressAndProfilePicture).toEqual({
  //       profilePicture: null,
  //       //walletAddress: MIKES_WALLET,
  //       walletAddress: 'dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8',
  //     });
  //   });
  // });

  // describe(`walletNameToAddressAndProfilePicture`, () => {
  //   test(`mikemaccana.abc`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'mikemaccana.abc'
  //     );
  //     expect(result).toEqual({
  //       // walletAddress: MIKES_WALLET,
  //       // profilePicture:
  //       //   'https://solana-cdn.com/cdn-cgi/image/width=100/https://nftstorage.link/ipfs/QmPS5zYVeVe17HbxLq8k34So5uu2kPWfMKbGKEH5MzwxR5/138.png',
  //       walletAddress: 'dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8',
  //       profilePicture: null,
  //     });
  //   });

  //   test(`sbf.poor`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'sbf.poor'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: FAKE_SBF,
  //       profilePicture: null,
  //     });
  //   });

  //   test(`vidor.sol`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'vidor.sol'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: VIDORS_WALLET,
  //       profilePicture:
  //         'https://solana-cdn.com/cdn-cgi/image/width=100/https://nftstorage.link/ipfs/bafybeiejlxdm3bpujja2saydp3dfakfnr7nd7b2ijopa3atmp3j2pw6dpy/1061.png',
  //       // profilePicture:
  //       //   'https://solana-cdn.com/cdn-cgi/image/width=100/https://arweave.net/i1I1GXelcZaEe5n0_TcVbVEEdz4mQR5lMWR2f6OplTs',
  //     });
  //   });

  //   test(`cryptogod69420.sol`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'cryptogod69420.sol'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: KRISPYS_WALLET,
  //       profilePicture: null,
  //     });
  //   });

  //   test(`vlad.poor`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'vlad.poor'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: VLADS_WALLET,
  //       profilePicture: null,
  //     });
  //   });

  //   test(`mikemaccana.glow`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'mikemaccana.glow'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: MIKES_WALLET,
  //       profilePicture:
  //         'https://cdn.glow.app/g/dg/7620b40c-6b78-4711-b0cf-71b5cbbb1080',
  //       // profilePicture:
  //       //   'https://cdn.glow.app/g/er/ae01b288-3bc6-4248-ac49-a6b6c6132fb6',
  //     });
  //   });

  //   test(`victor.glow`, async () => {
  //     const result = await walletNameToAddressAndProfilePicture(
  //       connection,
  //       'victor.glow'
  //     );
  //     expect(result).toEqual({
  //       walletAddress: 'vicFprL4kcqWTykrdz6icjv2re4CbM5iq3aHtoJmxrh',
  //       profilePicture:
  //         'https://cdn.glow.app/g/7z/40bc4c8e-34a4-4e6c-a022-a1a240e0af41',
  //     });
  //   });

  // test(`armani.backpack`, async () => {
  //   const result = await walletNameToAddressAndProfilePicture(
  //     connection,
  //     'armani.backpack',
  //     backpackJWT
  //   );
  //   expect(result).toEqual({
  //     walletAddress: ARMANIS_WALLET,
  //     profilePicture: 'https://swr.xnfts.dev/avatars/armani',
  //   });
  // });
  // });
});

// describe(`wallet addresses to names`, () => {
//   let connection: Connection;
//   beforeAll(async () => {
//     connection = await connect(rpcURL);
//   });

//   const WALLET_WITH_NO_NAMES = new PublicKey(WALLET_WITH_NO_NAME);

//   describe(`walletAddressToDotAnything`, () => {
//     test(`mike's wallet resolves to .abc domain`, async () => {
//       const result = await walletAddressToDotAnything(connection, mikesWallet);
//       expect(result).toEqual({
//         profilePicture: null,
//         walletName: 'mikemaccana.abc',
//       });
//     });

//     test(`wallets with no names return null`, async () => {
//       const result = await walletAddressToDotAnything(
//         connection,
//         WALLET_WITH_NO_NAMES
//       );
//       expect(result).toEqual({
//         profilePicture: null,
//         walletName: null,
//       });
//     });
//   });

//   describe(`walletAddressToDotGlow`, () => {
//     test(`mike's wallet resolves to .glow domain`, async () => {
//       const result = await walletAddressToDotGlow(mikesWallet);
//       expect(result).toEqual({
//         // profilePicture:
//         //   'https://cdn.glow.app/g/er/ae01b288-3bc6-4248-ac49-a6b6c6132fb6',
//         profilePicture:
//           'https://cdn.glow.app/g/dg/7620b40c-6b78-4711-b0cf-71b5cbbb1080',
//         walletName: 'mikemaccana.glow',
//       });
//     });
//   });

//   describe(`walletAddressToDotSolDomain`, () => {
//     test(
//       `mike's wallet resolves to .sol domain`,
//       async () => {
//         //const result = await walletAddressToDotSol(connection, mikesWallet);
//         const result = await walletAddressToDotSol(connection, newMikesWallet);
//         expect(result).toEqual({
//           profilePicture: null,
//           walletName: 'mikemaccana.sol',
//         });
//         // Bonfida is unreasonably slow
//       },
//       BONFIDA_IS_SLOW
//     );

//     test(
//       `vidor's wallet resolves to .sol domain`,
//       async () => {
//         const result = await walletAddressToDotSol(connection, vidorsWallet);
//         expect(result).toEqual({
//           profilePicture: null,
//           walletName: 'vidor.sol',
//         });
//       },
//       BONFIDA_IS_SLOW
//     );

//     test(`krispy's wallet resolves to .sol domain`, async () => {
//       const result = await walletAddressToDotSol(connection, krispysWallet);
//       expect(result).toEqual({
//         profilePicture: null,
//         // Seems to change every so often
//         walletName: expect.stringContaining('.sol'),
//       });
//     });

//     test(`wallets with no names return null`, async () => {
//       const result = await walletAddressToDotSol(
//         connection,
//         WALLET_WITH_NO_NAMES
//       );
//       expect(result).toEqual({
//         profilePicture: null,
//         walletName: null,
//       });
//     });
//   });

//   // describe(`walletAddressToDotBackpack`, () => {
//   //   // TODO: this endpoint seems to be in beta:
//   //   // - Reverse lookup of backpack domains does not yet seem to work
//   //   // for wallets other than Armani's.
//   //   // - Reverse lookup of backpack domains needs a JWT
//   //   const armanisWallet = new PublicKey(ARMANIS_WALLET);
//   //   testOrSkipIfJWTNotSetup(
//   //     `armani's wallet resolves to .backpack domain`,
//   //     async () => {
//   //       const result = await walletAddressToDotBackpack(
//   //         armanisWallet,
//   //         backpackJWT
//   //       );
//   //       expect(result).toEqual({
//   //         profilePicture: 'https://swr.xnfts.dev/avatars/armani',
//   //         walletName: 'armani.backpack',
//   //       });
//   //     }
//   //   );
//   // });

//   describe(`walletAddressToNameAndProfilePicture`, () => {
//     test(`solves mystery`, async () => {
//       const nameAndProfilePicture = await walletAddressToNameAndProfilePicture(
//         connection,
//         new PublicKey('4uUwQyiXK2BN8PXSzbcvVTbPJL2jjc9NZambw6pJQErs')
//       );
//       expect(nameAndProfilePicture).toEqual({
//         profilePicture: null,
//         walletName: null,
//       });
//     });
//     test(
//       `mike's wallet address returns his .abc name and his Solana PFP`,
//       async () => {
//         const nameAndProfilePicture =
//           await walletAddressToNameAndProfilePicture(connection, mikesWallet);
//         expect(nameAndProfilePicture).toEqual({
//           // profilePicture:
//           //   'https://solana-cdn.com/cdn-cgi/image/width=100/https://nftstorage.link/ipfs/QmPS5zYVeVe17HbxLq8k34So5uu2kPWfMKbGKEH5MzwxR5/138.png',
//           // walletName: 'mikemaccana.abc',
//           profilePicture:
//             'https://cdn.glow.app/g/dg/7620b40c-6b78-4711-b0cf-71b5cbbb1080',
//           walletName: 'mikemaccana.glow',
//         });
//       },
//       BONFIDA_IS_SLOW
//     );

//     test(
//       `vidor's wallet address returns his .sol wallet name and profile picture`,
//       async () => {
//         const nameAndProfilePicture =
//           await walletAddressToNameAndProfilePicture(connection, vidorsWallet);
//         expect(nameAndProfilePicture).toEqual({
//           // profilePicture:
//           //   'https://solana-cdn.com/cdn-cgi/image/width=100/https://arweave.net/i1I1GXelcZaEe5n0_TcVbVEEdz4mQR5lMWR2f6OplTs',
//           profilePicture:
//             'https://solana-cdn.com/cdn-cgi/image/width=100/https://nftstorage.link/ipfs/bafybeiejlxdm3bpujja2saydp3dfakfnr7nd7b2ijopa3atmp3j2pw6dpy/1061.png',
//           walletName: 'vidor.sol',
//         });
//       },
//       BONFIDA_IS_SLOW
//       //10 * SECONDS
//     );

//     // test(`armani's wallet address returns his wallet name`, async () => {
//     //   const nameAndProfilePicture = await walletAddressToNameAndProfilePicture(
//     //     connection,
//     //     armanisWallet,
//     //     backpackJWT
//     //   );
//     //   expect(nameAndProfilePicture).toEqual({
//     //     profilePicture: 'https://swr.xnfts.dev/avatars/armani',
//     //     walletName: 'armani.backpack',
//     //   });
//     // });
//   });
// });
