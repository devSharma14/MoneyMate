import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

// Global font imports
const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
`;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(147, 112, 219, 0.4);
  }
  50% {
    box-shadow: 0 0 0 30px rgba(147, 112, 219, 0);
  }
`;

const textGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(147, 112, 219, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(147, 112, 219, 0.6), 0 0 30px rgba(186, 164, 235, 0.4);
  }
`;

function HomePage({ onStart }) {
  const [user, setUser] = useState(["", ""]); // [name, email]
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    const nameTrimmed = user[0].trim();
    const emailTrimmed = user[1].trim();

    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameTrimmed && emailTrimmed && emailRegex.test(emailTrimmed)) {
      // Save user in parent (App.js)
      onStart([nameTrimmed, emailTrimmed]);

      // Persist to localStorage
      localStorage.setItem("user", JSON.stringify([nameTrimmed, emailTrimmed]));

      // Navigate to dashboard, replace history so back button won’t return here
      navigate("/dashboard", { replace: true });
    } else {
      // highlight both inputs on error
      document.querySelectorAll("input").forEach((input) => {
        input.style.borderColor = "#ef4444";
        input.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
      });

      setTimeout(() => {
        document.querySelectorAll("input").forEach((input) => {
          input.style.borderColor = "";
          input.style.boxShadow = "";
        });
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStart();
    }
  };

  return (
    <>
      <GlobalFonts />
      <HomeStyled>
        <BackgroundElements>
          <FloatingOrb delay="0s" size="200px" top="10%" left="5%" />
          <FloatingOrb delay="2s" size="150px" top="60%" right="10%" />
          <FloatingOrb delay="4s" size="180px" bottom="15%" left="15%" />
          <FloatingOrb delay="1s" size="120px" top="30%" right="25%" />
          <FloatingOrb delay="3s" size="100px" bottom="40%" right="40%" />
        </BackgroundElements>

        <MainContainer className={isVisible ? "visible" : ""}>
          <LeftSection>
            <LogoSection>
              <IconWrapper>
                <DollarIcon>$</DollarIcon>
              </IconWrapper>
              <BrandText>Money Mate</BrandText>
            </LogoSection>

            <HeroSection>
              <MainHeading>
                Master Your
                <GradientText> Financial Empire</GradientText>
                <br />
                <SecondaryText>One Transaction at a Time</SecondaryText>
              </MainHeading>

              <SubHeading>
                Transform your relationship with money. Our sophisticated platform combines
                elegant design with powerful analytics to give you complete control over
                your financial destiny.
              </SubHeading>
            </HeroSection>
          </LeftSection>

          <RightSection>
            <InputCard>
              <CardHeader>
                <CardTitle>Begin Your Journey</CardTitle>
                <CardSubtitle>Join thousands of users who've taken control</CardSubtitle>
              </CardHeader>

              <InputSection>
                <InputLabel>What should we call you?</InputLabel>
                <StyledInput
                  type="text"
                  placeholder="Enter your full name"
                  value={user[0]}
                  onChange={(e) => setUser([e.target.value, user[1]])}
                  onKeyPress={handleKeyPress}
                />

                <InputLabel>What's your email address?</InputLabel>
                <StyledInput
                  type="email"
                  placeholder="Enter your email"
                  value={user[1]}
                  onChange={(e) => setUser([user[0], e.target.value])}
                  onKeyPress={handleKeyPress}
                />

                <StartButton onClick={handleStart}>
                  <ButtonText>Start Your Journey</ButtonText>
                  <ArrowIcon>→</ArrowIcon>
                </StartButton>
              </InputSection>

              <InputHint>✨ Free forever • No credit card required</InputHint>
            </InputCard>
          </RightSection>
        </MainContainer>
      </HomeStyled>
    </>
  );
}

const HomeStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, 
    #fce1f0 0%,
    #f8d7ff 25%,
    #e6d3ff 50%,
    #fdf6fc 75%,
    #f0e6ff 100%
  );
  background-size: 400% 400%;
  animation: ${gradientFlow} 20s ease infinite;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(147, 112, 219, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(186, 164, 235, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(221, 210, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingOrb = styled.div`
  position: absolute;
  width: ${props => props.size || '150px'};
  height: ${props => props.size || '150px'};
  background: linear-gradient(135deg, 
    rgba(147, 112, 219, 0.1),
    rgba(186, 164, 235, 0.15),
    rgba(221, 210, 255, 0.1)
  );
  border-radius: 50%;
  filter: blur(2px);
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${props => props.delay};
  
  ${props => props.top && `top: ${props.top};`}
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
`;

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  gap: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  max-width: 700px;
  
  @media (max-width: 1024px) {
    text-align: center;
    max-width: 900px;
  }
`;

const RightSection = styled.div`
  flex: 0 0 450px;
  
  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
    max-width: 500px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: ${bounceIn} 1s ease-out 0.2s both;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1f2937, #374151, #4b5563);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 15px 35px rgba(31, 41, 55, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.1);
  animation: ${pulse} 4s infinite;
`;

const DollarIcon = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fbbf24;
  font-family: 'Space Grotesk', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const BrandText = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #1f2937, #374151, #6b7280);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -0.02em;
`;

const HeroSection = styled.div`
  animation: ${fadeInUp} 1s ease-out 0.4s both;
`;

const MainHeading = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  color: #111827;
  margin: 0 0 2rem 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
  animation: ${textGlow} 4s ease-in-out infinite;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, 
    #7c3aed 0%, 
    #a855f7 30%, 
    #c084fc 60%,
    #e879f9 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite alternate;
  font-style: italic;
`;

const SecondaryText = styled.span`
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  color: #4b5563;
  font-size: 0.7em;
  display: block;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
`;

const SubHeading = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  color: #374151;
  margin: 0 0 3rem 0;
  line-height: 1.8;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: translateX(10px);
    box-shadow: 0 8px 25px rgba(147, 112, 219, 0.15);
  }
  
  @media (max-width: 1024px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  min-width: 60px;
  text-align: center;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.3rem 0;
`;

const FeatureDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
`;

const InputCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px) saturate(1.8);
  -webkit-backdrop-filter: blur(30px) saturate(1.8);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(31, 41, 55, 0.15),
    0 10px 30px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  animation: ${fadeInUp} 1s ease-out 1s both;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

const CardSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
`;

const InputSection = styled.div``;

const InputLabel = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(107, 114, 128, 0.2);
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  color: #374151;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  
  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 
      0 0 0 4px rgba(124, 58, 237, 0.1),
      0 8px 25px rgba(124, 58, 237, 0.15);
    transform: translateY(-1px);
  }
`;

const StartButton = styled.button`
  padding: 1.2rem 2rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%);
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(31, 41, 55, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px rgba(31, 41, 55, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
      
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  letter-spacing: 0.02em;
`;

const ArrowIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  
  ${StartButton}:hover & {
    transform: translateX(3px);
  }
`;

const InputHint = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0;
  text-align: center;
  font-weight: 400;
`;

export default HomePage;