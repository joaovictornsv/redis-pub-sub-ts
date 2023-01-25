
export class EncondigService {

  encode(text: string): string {
    const buffer = Buffer.from(text, 'utf-8')

    const encodedText = buffer.toString('base64')
    return encodedText
  }

  decode(encodedText: string): string {
    const buffer = Buffer.from(encodedText, 'base64')

    const decodedText = buffer.toString('utf-8')
    return decodedText
  }
}