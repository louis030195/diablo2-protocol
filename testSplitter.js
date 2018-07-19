const createSplitter = require('./splitter').createSplitter

const {compress,decompress} = require('./compression');

const ProtoDef = require('protodef').ProtoDef
const Parser = require('protodef').Parser
const d2gsReader = require('./d2gsSpecialReader');


const protocol = require('./data/d2gs');
const protoToClient = new ProtoDef();
protoToClient.addTypes(d2gsReader);
protoToClient.addProtocol(protocol,["toClient"]);


const parser = new Parser(protoToClient, 'packet')

const splitter = createSplitter();

const inputs = [
  'f103175fb9e8c85a1c8b0348e5fff0437e64ac5d0ccd9d0df7e044d1feebddee12ee132e136e13ae7ee109dc9370f26a205c996847b8916850b41cc0e3f09d684c87aefde7d28e8948002412912d2a307db1431d8168641a5695183e08d7e14875330eafdc996db6db0eafe23db6db6c617777bddddfddddeefbbbdddeeef9290fde65474723971a91cd1efdcd18341e0d5834249a3fdcd3cc0d1c90fd05cd37fff87069a3e6068556bfff0fbfe4075bcefe40480adadfeb7e40480feb7fffeb7fadadfffcc6fc627e73289cb818395c8e727c171ca068e5873a44b4333ce8c20ade7463042f3932168e8cc64566902a808e68fcd2b632c2e8a41e82c42b80892834a2',
  'f105175fb9e8c85a1c8b0348e5fff0437e64ac5d0ccd9d0df7e044d1feebddee12ee132e136e13ae7ee109dc9370f26a205c996847b8916850b41cc02bf09d683687aefde7d28e894712901a444487213976c50c7605a190692243909cb8235f852080903abf7265b6db6c3abf88f6db6db185dddef7777f7777bbeeef777bbbe4a43f79951d1c8e5c6a47347bf73460d0783560d09268ff734f30347243f41734dfffe1c1a68f981a155afffc3eff901d6f3bf901202b6b7fadf901203fadffffadfeb6b7fff31bf189f9cca272e060e57239c9f05c7281a3961ce912d0ccf3a3082b79d18c10bce4c85a3a3319159a40aa0239a3f34ad8cb0ba2907a0b10ae0224a0d288',
]

const inputChains = [[
  'f1035c5d7ee7a32168722c0d2397ffc10df992b17433367437df811347fbaf77b84bb84cb84db84eb9fb8427724dc3c9a8817265a11ee245a142d0730b8fc275a1321ebbf79f4a3a255a0782522404439f6c50c7605a19069404439f046bf0a484d43abf7265b6db6c3abf88f6db6db185dddef7777f7777bbeeef777bbbe4a43f79951d1c8e5c6a47347bf73460d0783560d09268ff734f30347243f41734dfffe1c1a68f981a155afffc3eff901d6f3bf901202b6b7fadf901203fadffffadfeb6b7fff31bf189f9cca272e060e57239c9f05c7281a3961ce912d0ccf3a3082b79d18c10bce4c85a3a3319159a40aa0239a3f34ad8cb0ba2907a0b10ae0224a0d288',
  'f1c702a8037345f9a56c65914220480f0fae76035546306a430ee05501d1a1fe695b196180440901e1f5c8c01c9c4a0a83d1f0723506b3e0550283441cd2b632c22088120d8fae8006908805327128038401dc0aa03834639a56c65828050562f225c80210871400a919a3443cd101011951a1084845c3eb8154024d1734ad8cb87e6c6c84790b4010d47a20c023ad1529479044c94c3e200ac4e056b4881907f1488e1d0301e8793746b4359f02a80403447cd2b632c9c4809056443c85a60054a698800ec80118801b4520f80384448070d8581dc311d0154047987d6c658c62c0786e84790b410d0a4420550082e939a4848cb2007c170d908f2168384a0ed52ab8410141590151201b4e2b0845c0880ec358541400aa023cc7eb632e2f9ba1443c85a0868d0a002a808e88cbe42465a0486e24211e42d1a970079a815401f1a25e695b196291202415910f216982f83b2c0e40188904e09d4878278761a8d400255a1a5101540201a11b9a56c658a64809056443c85a4a02a534c400764008c400da3c87cc04548074d8a23b8623a02a80484867cd2b632cb4164ac6c84790b43c1a9e100a8d16a1723b03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b80f1d902a803e3434e695b1962a1202415910f2169397c1d96072198890cc09c2b87827968351a8004b0d4880aa023a235fad8cb0362f17c54443c85a06a60202802a8048489b9a56c65a00b45636423c85a1e0d4f0805468b508f0cb03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b8154047b3f5b1968c5e374288790b40111a1600aa0105dae695b1962b0f82e1b211e42d070947b21080b84101415100b6900ea7288843f8440761ac2a0a00550084689f9a56c6581f1f1487a84790b41488c220d4a8ec871b8ec1fae1da305a2503b5a763d102b4510d4880aa00f4d0db9a56c659121f97c2b211e42d01c1ecd0962cad118646436331081d928f0440d46605501d9a1bf34ad8cb0b226048363e3c8809e36855a510c2a0450cc660550084e71cd2b632e54170be84790b4321b0fe0647f2081a85227a10884004821d6876948108c0e8221db6e05500786847e695b1968c402f856423c85a4e3d894b4b4e980480935082c96807286dc0aa0119824734ad8cb403588a1e221e42d130d26a318350424015c8a0768cb80641a8f40e8048700f86f144201807c22944140a21485002a80001a06dcd2b632cc8220de0e508f20881392048104aa7822861086721dc21938842dae7c402005e686e14435220f1c302a8040340df9a56c659285f07424211e42d1e1b8ae318ad032511f83d4a164008821f0fe94d8c0410d2880aa012121cf34ad8cb4644158d908f216878353c20169a2d421c27606d2783b30048d0bc2002a1795148078fe03c3e0fc8a1e61087702a804848a39a56c659a1105636423c85a1e0d4f08018cd16a10a470c0da4f07660091a178400542f2a2900f1fc0787c1f9143cc210ee055007a6875cd2b632d20805f0ac84790b40707b343b165688c28a80d8cc420764a3c1103519815401b9a1df34ad8cb08422048363e3c88096031003d0983b8152334681c7344040231951a0084845c3eb8164222c39f7e6b5b1943b5ca66e8510f216878331a8632749c1dad1596aa5a028032ed03e140850725a2c86b3e0590894681d7bf35ad8ca29a03409056443c8fc5d0a8428ac1f0fa4c174070170e0ecbb03829004032250041f8881981c148058240020e07702c8498e1dfbf35ad8ca5a42b45c36423c85a0e128f6420e370828c2a8372a0f807138b2211782203b0d61505002c84433424fbf35ad8ca0dcc8ecbe1590ae08c0b04604c3683c0180287800ee0201a8f6071a2910085b702c8438340f3df9ad6c650a8463b2f856423ca14b1c5003d09c3b80f1c202c8446340f7df9ad6c65406ab43c07285703009c580922008435a62488a22882b478721406a7124421c40b802220490d2880b21110d095efcd6b632876cad521ea11e42d052230883514cec871ba0f570ed183d1281dad3b1e8815a2886a440590930d03ef7e6b5b194534e4e1c01ca11e42d00f426c5c1c60d41b00801866d2d3518ced283d00229135b702a4668d03fe6880804632a332084845c3eb81523346820734404046546d042422e1f5c0a919a341079a2020118ca8c37084845c3eb8152334682173440402319519182121170fae0548cd1a087cd1010119519b042422e1f5c0a919a34001cd101011951a8084845c3eb81540201a12f9a56c6594ca80e848423c85a3c3715c632bc78290fc1ea50b2004410f87f4a6c7220869440548cd1a1339a2020232a3ad422e1f5c0a919a341139a4808ca8d1ad422e1f5c0a919a341179a4804632a3345a845c3eb815233468237349008c654670b508b87d702a4668d047e6880804632a35c2121170fae05501c30247d6c658c6358611bcf8f2200707d702a8143024fc848cb2d0d61d0a8887904478230351acec228a450600aa03b3412beb632c870881e0a8887904410c3c108813d0a80e901d9a4f19602c8452604bf7e6b5b19403232283c36423c85a06a6a22088b84242108eca6028d03a07260069a150400182f1c0a209c0a81015c3a16c010ac6c118ec6c0c83b82a0cc66059092d1099efcd51ad403281b484117854442200b209c0e38fa62184e879018c8a01f0ec561b41591603c0d069440599239a137a01339c4808ca713b443d1f5c0b324734137a01339c4808ca70b9da21f8fae0599239a09dd0099ce240465384076886c3eb80588f6db6db00ae4cb6db6d8055c275b6db6c3abf7265b6db6c3abf88f6db6db39944e5c0c1cae47393e0b8e503472c39d225a199e7461056f3a3182179c990b47466322b349741eae0001aadfe1b81b03805c39390f521c87c90e440487221243f1f47102a4c78210903582716d7ff440ed01a2074442204681d110880d103a2076811a074410902340e8884407081d103b406881d1042406881d103b407081d1042407081d3df8633716da71dbc11bf2a38633716da5a6e1c0ffce3c10bbf32562e8666ce8804afd400c467c0b993f29017bf2080baefc0710089fc2b312010bf85662060e9f935000f1492012bf5003119f20143f158180787c0ba77e22017367e258170f5f9700b87cfcb805c407e5c02e213f2e2c7e18cdc5b69682330e04e431b8acd2d233821730e64ac5d0ccd9d2c30e431b8acd2d3c5d9e4984837149a5e465d9e7ebf3c5d3724c1d9b80169791974dcfd7e78b9af1c215cdc48697919735e7dd7e08d1f1fe11cdc6a696919c10ba3e64ac5d0ccd9d2c47c239b8d4d2d3c5cd387708e6e566b3c5ccf8b50ae6e32359e2e46e49842372c34bc8cb91b9fafcf174bc930a86e2eb4bc8cba5e7ebf3c5ccb92619cdc58697919732e7ebf0468b81192ce04e696919c10ba2e64ac5d0ccd9d2c45c96702734b4f1731e4987c7028b4bc8cb98f3f5f9e2e93926241c094d2f232e939fafcf1730e4986c704e697919730e7ebf046878fd0886e3db4b48ce085d0f32562e8666ce9621e110dc7b6969e2e8f926114dc74697919747cfd7e0f15d3c5d1724c1f1b80c697919745cfd7e08ccb81485d37179a5a467042e65cc958ba199b3a5865c2e9b8bcd2d04663cbd313817da5a467042e63cc958ba199b3a5863cc4e05f6969e2e71c93487056697919738e7ebf3c5cdf87b0cc6e32359e2e6dcc5c2e9b8026b3c5d3f24c349b8d4d2f232e9f9fafcf176b8f0f3818dac11a4e60f38185a5a467042e93992b174333674b1279c0c2d2d4eefc319b8b6d390095fa80188cf817327e5202f7e410175df80e20113f8566240217f0acc40c1d3f26a02012bf5003119f20143f158180787c0ba77e22017367e258170f5f9700b87cfcb805c407e5c02e213f2e01f77e62ac118693303f7ed0a81b0d10ba07d68494c311a86b3e07efd915858080420204209850066338694407efcc558230d26672642d1cca272b91c11b1c7f9c9c0ced2d343547042ec732562e8666ce9631ce4e0676969e2e878750f4e06a6b3c5d8e4988c7036b4bc8cbb1cfd7ef101046838ff9c175a5a686a8e085d0732562e8666ce9620f382eb4b4119fe3fc8a371e9a5a686a8e085cff32562e8666ce961fe451b8f4d2d046bf1fe94e003b4b4d0d495042ebf32562e8666ce962fd29c0076969e2e83926c1c179a5e465d073f5f9e2e7f926188dc7969791973fcfd7e78bafc93353801ed2f232ebf3f5f9e2efc933b38020d2f232efcfd7e73289cb818395c8e727c171ca068e5873a44b4333ce8c20ade7463042f3932168e8cc64566915b7fe8056dff8be1ddfb9e8c85a1c8b0348e5ff16adb7fe3c222a3bf7e0440603d0246683195fe035fb6d8bcba0f9e8c85a1c8b0348e5ff2a8d63716c6e2c0c87bfea5fb86437002d3d10b3600'
],
[
  '067a09a5f5c0',
  'f104175fb9e8c85a1c8b0348e5fff0437e64ac5d0ccd9d0df7e044d1feebddee12ee132e136e13ae7ee109dc9370f26a205c996847b8916850b41cc897e13ad0990f5dfbcfa51d1284a04600100116d73ed8a18ec0b4320d2045b5cf8235f8520c6983abf7265b6db6c3abf88f6db6db185dddef7777f7777bbeeef777bbbe4a43f79951d1c8e5c6a47347bf73460d0783560d09268ff734f30347243f41734dfffe1c1a68f981a155afffc3eff901d6f3bf901202b6b7fadf901203fadffffadfeb6b7fff31bf189f9cca272e060e57239c9f05c7281a3961ce912d0ccf3a3082b79d18c10bce4c85a3a3319159a40aa0239a3f34ad8cb0ba2907a0b10ae0224a0d2880',
  'f1c702a8037345f9a56c65914220480f0fae76035546306a430ee05501d1a1fe695b196180440901e1f5c8c01c9c4a0a83d1f0723506b3e0550283441cd2b632c22088120d8fae8006908805327128038401dc0aa03834639a56c65828050562f225c80210871400a919a3443cd101011951a1084845c3eb8154024d1734ad8cb87e6c6c84790b4010d47a20c023ad1529479044c94c3e200ac4e056b4881907f1488e1d0301e8793746b4359f02a80403447cd2b632c9c4809056443c85a60054a698800ec80118801b4520f80384448070d8581dc311d0154047987d6c658c62c0786e84790b410d0a4420550082e939a4848cb2007c170d908f2168384a0ed52ab8410141590151201b4e2b0845c0880ec358541400aa023cc7eb632e2f9ba1443c85a0868d0a002a808e88cbe42465a0486e24211e42d1a970079a815401f1a25e695b196291202415910f216982f83b2c0e40188904e09d4878278761a8d400255a1a5101540201a11b9a56c658a64809056443c85a4a02a534c400764008c400da3c87cc04548074d8a23b8623a02a80484867cd2b632cb4164ac6c84790b43c1a9e100a8d16a1723b03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b80f1d902a803e3434e695b1962a1202415910f2169397c1d96072198890cc09c2b87827968351a8004b0d4880aa023a235fad8cb0362f17c54443c85a06a60202802a8048489b9a56c65a00b45636423c85a1e0d4f0805468b508f0cb03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b8154047b3f5b1968c5e374288790b40111a1600aa0105dae695b1962b0f82e1b211e42d070947b21080b84101415100b6900ea7288843f8440761ac2a0a00550084689f9a56c6581f1f1487a84790b41488c220d4a8ec871b8ec1fae1da305a2503b5a763d102b4510d4880aa00f4d0db9a56c659121f97c2b211e42d01c1ecd0962cad118646436331081d928f0440d46605501d9a1bf34ad8cb0b226048363e3c8809e36855a510c2a0450cc660550084e71cd2b632e54170be84790b4321b0fe0647f2081a85227a10884004821d6876948108c0e8221db6e05500786847e695b1968c402f856423c85a4e3d894b4b4e980480935082c96807286dc0aa0119824734ad8cb403588a1e221e42d130d26a318350424015c8a0768cb80641a8f40e8048700f86f144201807c22944140a21485002a80001a06dcd2b632cc8220de0e508f20881392048104aa7822861086721dc21938842dae7c402005e686e14435220f1c302a8040340df9a56c659285f07424211e42d1e1b8ae318ad032511f83d4a164008821f0fe94d8c0410d2880aa012121cf34ad8cb4644158d908f216878353c20169a2d421c27606d2783b30048d0bc2002a1795148078fe03c3e0fc8a1e61087702a804848a39a56c659a1105636423c85a1e0d4f08018cd16a10a470c0da4f07660091a178400542f2a2900f1fc0787c1f9143cc210ee055007a6875cd2b632d20805f0ac84790b40707b343b165688c28a80d8cc420764a3c1103519815401b9a1df34ad8cb08422048363e3c88096031003d0983b8152334681c7344040231951a0084845c3eb8164222c39f7e6b5b1943b5ca66e8510f216878331a8632749c1dad1596aa5a028032ed03e140850725a2c86b3e0590894681d7bf35ad8ca29a03409056443c8fc5d0a8428ac1f0fa4c174070170e0ecbb03829004032250041f8881981c148058240020e07702c8498e1dfbf35ad8ca5a42b45c36423c85a0e128f6420e370828c2a8372a0f807138b2211782203b0d61505002c84433424fbf35ad8ca0dcc8ecbe1590ae08c0b04604c3683c0180287800ee0201a8f6071a2910085b702c8438340f3df9ad6c650a8463b2f856423ca14b1c5003d09c3b80f1c202c8446340f7df9ad6c65406ab43c07285703009c580922008435a62488a22882b478721406a7124421c40b802220490d2880b21110d095efcd6b632876cad521ea11e42d052230883514cec871ba0f570ed183d1281dad3b1e8815a2886a440590930d03ef7e6b5b194534e4e1c01ca11e42d00f426c5c1c60d41b00801866d2d3518ced283d00229135b702a4668d03fe6880804632a332084845c3eb81523346820734404046546d042422e1f5c0a919a341079a2020118ca8c37084845c3eb8152334682173440402319519182121170fae0548cd1a087cd1010119519b042422e1f5c0a919a34001cd101011951a8084845c3eb81540201a12f9a56c6594ca80e848423c85a3c3715c632bc78290fc1ea50b2004410f87f4a6c7220869440548cd1a1339a2020232a3ad422e1f5c0a919a341139a4808ca8d1ad422e1f5c0a919a341179a4804632a3345a845c3eb815233468237349008c654670b508b87d702a4668d047e6880804632a35c2121170fae05501c30247d6c658c6358611bcf8f2200707d702a8143024fc848cb2d0d61d0a8887904478230351acec228a450600aa03b3412beb632c870881e0a8887904410c3c108813d0a80e901d9a4f19902c8452604bf7e6b5b19403232283c36423c85a06a6a22088b84242108eca6028d03a07260069a150400182f1c0a209c0a81015c3a16c010ac6c118ec6c0c83b82a0cc66059092d1099efcd51ad403281b484117854442200b209c0e38fa62184e879018c8a01f0ec561b41591603c0d069440599239a137a01339c4808ca713b443d1f5c0b324734137a01339c4808ca70b9da21f8fae0599239a09dd0099ce240465384076886c3eb80588f6db6db00ae4cb6db6d8055c275b6db6c3abf7265b6db6c3abf88f6db6db39944e5c0c1cae47393e0b8e503472c39d225a199e7461056f3a3182179c990b47466322b349741eae0001aadfe1b81b03805c39390f521c87c90e440487221243f080188ae303c6b1983484f16d7ff444e4007cfba212901007dd1094800f9f7444e40401f7442b20200fba212901047dd1139001f3ee88564007cfba22720208fba215901047dd3df8c89cb499c76f046fca8e32272d265a4701e7cec7fe71e085df992b17433367440257ea006233e05cc9f9480bdf90405d77e0388044fe159890085fc2b3103074fc9a80f1532012bf5003119f20143f158180787c0ba77e22017367e258170f5f9700b87cfcb805c407e5c02e213f2e2c7e32272d265a08d1f02713138ba996919c10ba3e64ac5d0ccd9d2c47c4c4e2ea65a78ba5e4988c9c634cbc8cba5e7ebf0468b8ff26a70089969a1a8c7042e8b992b174333674b11726a700899682343c7e89a9cbc996919c10ba1e64ac5d0ccd9d2c43c4d4e5e4cb4f1732e498a09c06a65e465ccb9fafcf1731e498929c6c4cbc8cb98f3f5f82330e0522f272da65a467042e61cc958ba199b3a5861c5e4e5b4cb4f1735e62e2f271953678b9a724c524e2da65e465cd39fafcf1733e4994d38ce997919733e7ebf3c5c8dc3b8c69cae9b4eefc644e5a4ce40257ea006233e05cc9f9480bdf90405d77e0388044fe159890085fc2b3103074fc9a80804afd400c467c8050fc560601e1f02e9df88805cd9f89605c3d7e5c02e1f3f2e017101f9700b884fcb8f15303eefcc558230d26607efda150361a21740fad0929862350d67c0fdfb22b0b01008404084130a00cc670d2880fdf98ab0461a4cce4c85a39944e57238236397a36272c265a467042ec732562e8666ce9631c6c4e584cb411a0e3fc06272c265a467042e83992b174333674b1070189cb09969e2e938e100a9cf132f232e939f75f9e2e61c931b138ae997919730e7ebf3c5d1f24c684e30265e465d1f3f5f9e2e8b926025395132f232e8b9fafc119fe3fc5f4e04532d34353b82173fcc958ba199b3a587f8be9c08a65a78ba1e2d45b4e3626cf176392632271f932f232ec73f5f9e2e838750049cb89b3c5cff0f632a71ad3678bafc7873d4e0113608d7e60ea938dc996919c10bafcc958ba199b3a58bf549c6e4cb4f177e498e89c6e4cbc8cbbf3f5f9cca272e060e57239c9f05c7281a3961ce912d0ccf3a3082b79d18c10bce4c85a3a3319159a456dffa015b7fe4717c3bbf73d190b439160691cbfe2d5b6ffc78445477efc0880c07a048cd0632bfc06bf6db179741f3d190b439160691cbfe551ac6e2d8dc58190f7fd4bf72d2719533d10b360',

],
  [
    '067a09a5f5c0',
    'f104175fb9e8c85a1c8b0348e5fff0437e64ac5d0ccd9d0df7e044d1feebddee12ee132e136e13ae7ee109dc9370f26a205c996847b8916850b41cd03f09d684c87aefde7d28e8942102009488150aadaed8a18ec0b4320d20a8556d7046bf0a406928757ee4cb6db6d8757f11edb6db630bbbbdeeeefeeeef77dddeeef777c9487ef32a3a391cb8d48e68f7ee68c1a0f06ac1a124d1fee69e6068e487e82e69bfffc3834d1f30342ab5fff87dff203ade77f2024056d6ff5bf202407f5bffff5bfd6d6fffe637e313f39944e5c0c1cae47393e0b8e503472c39d225a199e7461056f3a3182179c990b47466322b348154047347e695b196174520f416215c044941a510f1c702a8037345f9a56c65914220480f0fae76035546306a430ee05501d1a1fe695b196180440901e1f5c8c01c9c4a0a83d1f0723506b3e0550283441cd2b632c22088120d8fae8006908805327128038401dc0aa03834639a56c65828050562f225c80210871400a919a3443cd101011951a1084845c3eb8154024d1734ad8cb87e6c6c84790b4010d47a20c023ad1529479044c94c3e200ac4e056b4881907f1488e1d0301e8793746b4359f02a80403447cd2b632c9c4809056443c85a60054a698800ec80118801b4520f80384448070d8581dc311d0154047987d6c658c62c0786e84790b410d0a4420550082e939a4848cb2007c170d908f2168384a0ed52ab8410141590151201b4e2b0845c0880ec358541400aa023cc7eb632e2f9ba1443c85a0868d0a002a808e88cbe42465a0486e24211e42d1a970079a815401f1a25e695b196291202415910f216982f83b2c0e40188904e09d4878278761a8d400255a1a5101540201a11b9a56c658a64809056443c85a4a02a534c400764008c400da3c87cc04548074d8a23b8623a02a80484867cd2b632cb4164ac6c84790b43c1a9e100a8d16a1723b03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b80',
    'f1d902a803e3434e695b1962a1202415910f2169397c1d96072198890cc09c2b87827968351a8004b0d4880aa023a235fad8cb0362f17c54443c85a06a60202802a8048489b9a56c65a00b45636423c85a1e0d4f0805468b508f0cb03693c1d98024685e100150bca8a403c7f01e1f07e450f30843b8154047b3f5b1968c5e374288790b40111a1600aa0105dae695b1962b0f82e1b211e42d070947b21080b84101415100b6900ea7288843f8440761ac2a0a00550084689f9a56c6581f1f1487a84790b41488c220d4a8ec871b8ec1fae1da305a2503b5a763d102b4510d4880aa00f4d0db9a56c659121f97c2b211e42d01c1ecd0962cad118646436331081d928f0440d46605501d9a1bf34ad8cb0b226048363e3c8809e36855a510c2a0450cc660550084e71cd2b632e54170be84790b4321b0fe0647f2081a85227a10884004821d6876948108c0e8221db6e05500786847e695b1968c402f856423c85a4e3d894b4b4e980480935082c96807286dc0aa0119824734ad8cb403588a1e221e42d130d26a318350424015c8a0768cb80641a8f40e8048700f86f144201807c22944140a21485002a80001a06dcd2b632cc8220de0e508f20881392048104aa7822861086721dc21938842dae7c402005e686e14435220f1c302a8040340df9a56c659285f07424211e42d1e1b8ae318ad032511f83d4a164008821f0fe94d8c0410d2880aa012121cf34ad8cb4644158d908f216878353c20169a2d421c27606d2783b30048d0bc2002a1795148078fe03c3e0fc8a1e61087702a804848a39a56c659a1105636423c85a1e0d4f08018cd16a10a470c0da4f07660091a178400542f2a2900f1fc0787c1f9143cc210ee055007a6875cd2b632d20805f0ac84790b40707b343b165688c28a80d8cc420764a3c1103519815401b9a1df34ad8cb08422048363e3c88096031003d0983b8152334681c7344040231951a0084845c3eb8164222c39f7e6b5b1943b5ca66e8510f216878331a8632749c1dad1596aa5a028032ed03e140850725a2c86b3e0590894681d7bf35ad8ca29a03409056443c8fc5d0a8428ac1f0fa4c174070170e0ecbb03829004032250041f8881981c148058240020e07702c8498e1dfbf35ad8ca5a42b45c36423c85a0e128f6420e370828c2a8372a0f807138b2211782203b0d61505002c84433424fbf35ad8ca0dcc8ecbe1590ae08c0b04604c3683c0180287800ee0201a8f6071a2910085b702c8438340f3df9ad6c650a8463b2f856423ca14b1c5003d09c3b80f1c202c8446340f7df9ad6c65406ab43c07285703009c580922008435a62488a22882b478721406a7124421c40b802220490d2880b21110d095efcd6b632876cad521ea11e42d052230883514cec871ba0f570ed183d1281dad3b1e8815a2886a440590930d03ef7e6b5b194534e4e1c01ca11e42d00f426c5c1c60d41b00801866d2d3518ced283d00229135b702a4668d03fe6880804632a332084845c3eb81523346820734404046546d042422e1f5c0a919a341079a2020118ca8c37084845c3eb8152334682173440402319519182121170fae0548cd1a087cd1010119519b042422e1f5c0a919a34001cd101011951a8084845c3eb81540201a12f9a56c6594ca80e848423c85a3c3715c632bc78290fc1ea50b2004410f87f4a6c7220869440548cd1a1339a2020232a3ad422e1f5c0a919a341139a4808ca8d1ad422e1f5c0a919a341179a4804632a3345a845c3eb815233468237349008c654670b508b87d702a4668d047e6880804632a35c2121170fae05501c30247d6c658c6358611bcf8f2200707d702a8143024fc848cb2d0d61d0a8887904478230351acec228a450600aa03b3412beb632c870881e0a8887904410c3c108813d0a80e901d9a4f19802c8452604bf7e6b5b19403232283c36423c85a06a6a22088b84242108eca6028d03a07260069a150400182f1c0a209c0a81015c3a16c010ac6c118ec6c0c83b82a0cc66059092d1099efcd51ad403281b484117854442200b209c0e38fa62184e879018c8a01f0ec561b41591603c0d069440599239a137a01339c4808ca713b443d1f5c0b324734137a01339c4808ca70b9da21f8fae0599239a09dd0099ce240465384076886c3eb80588f6db6db00ae4cb6db6d8055c275b6db6c3abf7265b6db6c3abf88f6db6db39944e5c0c1cae47393e0b8e503472c39d225a199e7461056f3a3182179c990b47466322b349741eae0001aadfe1b81b03805c39390f521c87c90e440487221243f0104f09032bcbc228680362daffe88ae7c6a40e88a67d520744533e3520744573ea903a218cfaa40e88a67c7140e88ae7c6a40e88633e3520744573e38a0744319f1c503a7bf09668513671dbc11bf2a384b34289b2d2380f3e763ff38f042efcc958ba199b3a2012bf5003119f02e64fca405efc8202ebbf01c40227f0acc48042fe15988183a7e4d400f1592012bf5003119f20143f158180787c0ba77e22017367e258170f5f9700b87cfcb805c407e5c02e213f2e2c7e12cd0a26cb411a3e04e0a0d051365a467042e8f992b174333674b11f05068289b2d3c5d2f24c119a0ac6cbc8cba5e7ebf0468b8ff052682e9b2d343555042e8b992b174333674b117052682e9b2d046878fd054683b1b2d233821743cc958ba199b3a588782a341d8d969e2e65c9305a68371b2f232e65cfd7e78b98f24c131a0be6cbc8cb98f3f5f82330e052110d05b365a467042e61cc958ba199b3a5861c221a0b66cb4f1735e62e110d0a46d9e2e69c9305e684d365e465cd39fafcf1733e4983b342a1b2f232e67cfd7e78b91b877094684e36d3bbf09668513672012bf5003119f02e64fca405efc8202ebbf01c40227f0acc48042fe15988183a7e4d4040257ea006233e40287e2b0300f0f8174efc4402e6cfc4b02e1ebf2e0170f9f9700b880fcb805c427e5cf15b03eefcc558230d26607efda150361a21740fad0929862350d67c0fdfb22b0b01008404084130a00cc670d2880fdf98ab0461a4cce4c85a39944e57238236397a168d058365a467042ec732562e8666ce9631c2d1a0b06cb411a0e3fd01a8b06cb4d0d4ee085d0732562e8666ce9620e80d458365a78ba4e384309a0966cbc8cba4e7dd7e78b98724c2d1a130d97919730e7ebf3c5d1f24c2b1a140d97919747cfd7e78ba2e49b668261b2f232e8b9fafc119fe3fc229a0e86cb4d0d55410b9fe64ac5d0ccd9d2c3fc229a0e86cb4f1743c5a83e3417cdb3c5d8e4984b3400a6cbc8cbb1cfd7e78ba0e1d41f9a0e26d9e2e7f87b09e682f1b678bafc7870a8682e9b608d7e60e150d060365a467042ebf32562e8666ce962fc2a1a0c06cb4f177e4986234180d9791977e7ebf39944e5c0c1cae47393e0b8e503472c39d225a199e7461056f3a3182179c990b47466322b348adbff402b6ffc04817c3bbf73d190b439160691cbfe2d5b6ffc78445477efc0880c07a048cd0632bfc06bf6db179741f3d190b439160691cbfe551ac6e2d8dc58190f7fd4bf709c682c9b3d10b3600',
    '0c52fdc279a0b06cf442cd80',
    '0958fc279a0b06cb40',
    '17528fb82834279b3d10b36149877094682f9b3d10b360',
    '0c52fdc219a144d9e9459b00',
    '14588782a341d8d96a963b860343c367a2166c00',
    '09588f82834279b2d0',
    '940f1057f78be3216962b1a158d8368d6320da348d6305b2c8942f8a6220aa2d8c076211d8b4349d9646958b0651acb2ac643d3b1a86e1ac6a1a46c194ed58d876321e9e8d2380ca5a0e1b2c88d0f1057f78be3216962b1a158d8368d6320da348d63045516c3a11098261d950691b8b0322b1c4413b1506b190682c8cb0f1057f78be3216962b1a158d8368d6320da348d63060',
    '09588782a341d8d968',
    '09588782a341d8d968',
    '0958fc219a144d9680'
  ]

]

// other input splitter.write(Buffer.from('057a09a5f0','hex'))
inputChains[2].forEach(input => splitter.write(Buffer.from(input,"hex")))

splitter.on('data', data => {

  console.log("here is the splitted data", data)

  console.log("decompressed data", decompress(data))

  if(data[0] !== 0x7A)
    parser.write(decompress(data))
}

);

parser.on('data', packet => {
  const {data} = packet;
  const {name, params} = data;
  console.log('packet', name, params);
  if(packet.data.name==="D2GS_STATEADD")
    console.log('packet the length', packet.data.params.length)
})