import { 
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button ,
} from "@react-email/components";

interface VerificationEmailProps{
  username : string;
  otp : string;
}


export default function VerificationEmail({username , otp} : VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Verification Code</title>
      </Head>
      <Preview>Here&apos;s your Verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username}</Heading>
        </Row>
        <Row>
          <Text>
            Thank u for registering. Please use the following verification code to complete your registeration
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>If you don't request this code please ignore this email</Text>
        </Row>
        <Row>
          <Button
          href={`http://localhost:3000/verify/${username}`}
          style={{color : "#61dafb"}}
          >
            Verify Here
          </Button>  
        </Row>
      </Section>
    </Html>
  );
}


