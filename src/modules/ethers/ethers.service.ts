import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, parseEther, formatEther } from 'ethers';

@Injectable()
export class EthersService {
  private provider: ethers.JsonRpcProvider;
  private account1: ethers.Wallet;
  private account2: ethers.Wallet;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey1 = this.configService.get<string>('ACCOUNT1_PRIVATE_KEY');
    const privateKey2 = this.configService.get<string>('ACCOUNT2_PRIVATE_KEY');

    // ethers.js 라이브러리를 통해 이더리움 블록체이노가 연결할 준비를 한다  
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    // ehters.Wallet: ethers.js에서 제공하는 지갑 객체 
    // this.provider: 앞서 생성한 JsonRpcProvider; 이걸 넣으면 Wallet이 블록체인 네트워크와 연결된 지갑으로 바뀜
    this.account1 = new ethers.Wallet(privateKey1!, this.provider);
    this.account2 = new ethers.Wallet(privateKey2!, this.provider);
  }

  getAccount1() {
    return this.account1;
  }

  getAccount2() {
    return this.account2;
  }

  getNonce(account: ethers.Wallet) {
    return account.getNonce();
  }

  parseEther(data: string) {
    return parseEther(data);
  }

  formatEther(data: bigint) {
    return formatEther(data);
  }

  // 위 코드는 지우지 마세요.

  async getBalance() {
    // Todo: account1의 잔액(balance)을 리턴합니다.
    return await this.provider.getBalance(this.getAccount1().address);
  }

  async send1ETH(nonce: number) {
    // Todo: account1이 account2에게 1ETH를 전송해야 합니다.
    return await this.getAccount1().sendTransaction({
      to: this.getAccount2().address,
      value: parseEther('1'),
      nonce,
    });
  }

  async send30ETH() {
    // Todo: account2가 account1에게 30ETH를 전송해야 합니다.
    const tx = await this.getAccount2().sendTransaction({
      to: this.getAccount1().address,
      value: parseEther('30'),
    });
  }
}

