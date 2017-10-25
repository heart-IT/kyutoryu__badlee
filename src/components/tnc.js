/**
 * @name- tnc.js
 * 
 * @chill- The present moment contains past and future. The secret of transformation is in the way we handle this very moment. -Thich Nhat Hanh
 * 
 * 
 * @description- Terms and condition page
 * 
 * @author- heartit pirates were here
 */

"use strict";

import React, { Component } from "react";
import {
  View,
  Text,
  StyleProvider,
  Header,
  Left,
  Container,
  Content
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import getTheme from "../theme/components";
import { connect } from "react-redux";
import * as actionCreators from "../badlee__redux/action_creators";

class TnC extends Component {
  goBack() {
    this.props.goBack();
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ flex: 1 }}>
          <Header style={{ backgroundColor: "#611265" }}>
            <Left style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={this.goBack.bind(this)}>
                <Icon name="menuBackIcon" width="16" height="16" fill="#fff" />
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 18, marginLeft: 6 }}>
                Terms & Condition
              </Text>
            </Left>
          </Header>
          <Content
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, padding: 12 }}
          >
            <ScrollView>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.header1}>Terms and Conditions of Use</Text>
                <Text style={styles.bodyText}>
                  Welcome to Badlee, social network that targets the general
                  benefit of the community by encouraging a providing a platform
                  for users to lend and borrow their. We know that Badlee is
                  awesome and every awesome thing needs to be controlled. These
                  are the terms and conditions that you and us agree to abide by
                  when using Badlee.
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: 6,
                  padding: 6
                }}
              >
                <Text style={{ ...styles.header2, ...{ marginTop: 0 } }}>
                  Definitions:
                </Text>
                <Text style={styles.header3}>Badlee</Text>
                <Text style={styles.bodyText}>
                  Is an application for mobile devices which uses an API service
                  developed by Badlee. “Us”, “we”, “our” all terms shall mean
                  Badlee.
                </Text>
                <Text style={styles.header3}>Members / Users</Text>
                <Text style={styles.bodyText}>
                  All the users that register to Badlee for use of its product
                  and services. “You”, “your”, “yourself”, “they”, “Them” etc
                  shall mean members/ users.
                </Text>
                <Text style={styles.header3}>Posts</Text>
                <Text style={styles.bodyText}>
                  All the content which a user has intentionally or
                  unintentionally made available on Badlee by using the posting
                  feature of Badlee distributed among different heads namely,
                  “Show off”, “shout out” or “Lend and Borrow” and even
                  comments.
                </Text>
                <Text style={styles.header2}>Registration:</Text>
                <Text style={styles.bodyText}>
                  You may access the content of Badlee after registering and by
                  filling in the registration/ signup form provided in the
                  application. Once you register on Badlee your data is stored
                  in our database which we do not share with anyone. Though your
                  images and profile/ display image may be used by us for the
                  promotion of our services and product and other related
                  products and services. By registering on badlee as a member
                  user, you agree to following terms:
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  1. You are above 18 years of age.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  2. Your account and password are for your personal use and
                  shall not be used by anyone other than yourself.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  3. Your information is through safe with us but you are
                  advised not to enter personal information on your profile
                  since the same might be misused.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  4. By registering you agree that you are a real person and not
                  creating a fake profile and or not misrepresenting anyone else
                  falsely.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  5. You will not do anything which would allow an unregistered
                  user to access the content which is only meant to use by a
                  registered user.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  6. You will not create or register accounts to misuse the
                  functionality of the application or for the purpose of
                  spamming.
                </Text>
                <Text style={styles.header2}>Termination of Registration</Text>
                <Text style={styles.bodyText}>
                  Your account may be terminated if you do not comply with aby
                  term or condition stated here or you appear to be breach any
                  of these.
                </Text>
                <Text style={styles.bodyText}>
                  We may terminate your account at our sole discretion without
                  any prior intimation, immediately, by giving or not giving you
                  any reason for the said termination.
                </Text>
                <Text style={styles.bodyText}>
                  If you no longer agree to the terms and conditions or changed
                  terms from time to time, you may discontinue the use of the
                  application and may further email us at >>>>>>> with a request
                  to discontinue or terminate your account.
                </Text>
                <Text style={styles.header2}>User Content</Text>
                <Text style={styles.bodyText}>
                  The user / member can only post content on Badlee after a
                  registration and the content so posted shall abide by the
                  following terms:
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  1. No use of any material which may infringe the intellectual
                  property right of any individual, is allowed and it is
                  expected that the content you have posted is created by you
                  and you are the rightful owner of its Intellectual Property
                  Rights.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  2. We do not support racism, casteism, hateful speech,
                  homophobia or any other discrimination for that matter which
                  may be interpreted as such and such posts are not allowed on
                  Badlee
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  3. We understand discussions, humour and debates but
                  irrelevant abusive language, persistent trolling and bullying
                  will not be tolerated and shall not be allowed.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  4. You accept and understand that the content you submit to us
                  is not obscene, threatening, harassing, libellous, deceptive,
                  fraudulent, invasive of another's privacy, offensive,
                  defamatory of any person or illegal. You warrant that the
                  content you submit to us does not infringe any patent,
                  trademark, trade secret, copyright, or other intellectual or
                  proprietary or privacy right of any party or individual. You
                  agree not to{" "}
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.nestedUlList }}>
                  a. post content which is deliberately intended to upset or
                  harm other users;
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.nestedUlList }}>
                  b. use Badlee to post or otherwise transmit content that
                  victimises, harasses, degrades, or intimidates an individual
                  or group of individuals on the basis of any impermissible
                  classification, including, without limitation, religion,
                  gender, sexual orientation, race, colour, creed, ethnicity,
                  national origin, citizenship, age, marital status, military
                  status or disability;
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.nestedUlList }}>
                  c. post or otherwise transmit any content that contains
                  software viruses or any other computer code, files, or
                  programs designed to interrupt, destroy, or limit the
                  functionality of Badlee or any computer software or hardware
                  or telecommunications equipment;
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.nestedUlList }}>
                  d. upload or otherwise transmit any content, or take any other
                  actions with respect to your use of Badlee, that would
                  constitute, or would otherwise encourage, criminal conduct or
                  give rise to civil liability; or{" "}
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.nestedUlList }}>
                  e. use Badlee for commercial purposes, including, without
                  limitation, submitting any material to solicit funds or to
                  promote, advertise or solicit the sale of any goods or
                  services.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  5. We respect the will and emotions of everyone, even if you
                  feel that the post is relevant but several other users report
                  the same, we will remove it for the betterment of the
                  community at Badlee.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  6. We will remove the content which may put us in any legal
                  jeopardy.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  7. Posts that are commercial in nature and are intended as
                  apams shall be removed.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  8. Even if you own the copyright of the material that you have
                  posted on Badlee, you give us an unconditional, irrevocable,
                  non-exclusive, royalty-free, fully transferable, perpetual
                  worldwide licence to use, publish and/or transmit, and to
                  authorise third-parties to use, publish and/or transmit your
                  content in any format and on any platform, either now known or
                  hereinafter invented.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  9. You acknowledge that the content posted by you on Badlee is
                  publically available to everyone and anyone can see it. You
                  understand that the views of people and comments on your
                  content in no way expresses the view of Badlee.
                </Text>
                <Text style={{ ...styles.bodyText, ...styles.ulList }}>
                  10. You understand that the content you have posted might not
                  be published completely or not according to your expectations
                  and we do not have any mode or method of pre monitoring the
                  content anyone posts therefore for any such problem, Badlee
                  shall not be liable.
                </Text>
                <Text style={styles.bodyText}>
                  Please do not post any material if you do not abide by the
                  terms stated above and any post that does not abides by the
                  terms afore stated or is reported more than twice shall be
                  deleted with or without any intimation to the user who has
                  posted the same.
                </Text>
                <Text style={styles.header2}>Liability and Jurisdiction</Text>
                <Text style={styles.bodyText}>
                  Since badlee is not posting any content by itself, it shall
                  not be responsible for breach of anyone’s Intellectual
                  Property and the user who has posted shall be the one
                  responsible for any such breach.
                </Text>
                <Text style={styles.bodyText}>
                  Any dispute arising out of the services of Badlee and the
                  product shall be handled in accordance with the Law applicable
                  in India and in India whereby the territorial Jurisdiction
                  shall remain at Jaipur, Rajasthan as the principal place of
                  business is there.
                </Text>
                <Text style={styles.bodyText}>
                  Any dispute arising out of the services of Badlee and the
                  product shall initially be addressed to an arbitrator
                  appointed by the parties and the arbitration shall take place
                  at Jaipur, Rajasthan, India in english.
                </Text>
                <Text style={styles.bodyText}>
                  Badlee shall not be responsible or liable for any loss or
                  damage caused to the party by any means which may or may not
                  be associated to Badlee and shall neither be liable to pay
                  monetary or non monetary compensations.
                </Text>
                <Text style={styles.bodyText}>
                  The data or content at Badlee comes with absolutely no
                  warranty or guarantee and therefore whatever is posted or
                  information given to Badlee is at user’s own risk and
                  discretion. The data might get stolen or destroyed or even
                  hacked (You know how bad the world is).
                </Text>
                <Text style={styles.bodyText}>
                  We do not guarantee that the content shall be available
                  without any interruption or delays.
                </Text>
                <Text style={styles.bodyText}>
                  We give no warranties of any kind concerning Badlee or its
                  content. In particular, we do not warrant that Badlee or any
                  of its contents is virus free. You must take your own
                  precautions in this respect as we accept no responsibility for
                  any infection by virus or other contamination or by anything
                  which has destructive properties.
                </Text>
                <Text style={styles.header2}>
                  Security while exchanging or lending articles:
                </Text>
                <Text style={styles.bodyText}>
                  The security of your data and items is at your hands and you
                  shall be responsible for that.
                </Text>
                <Text style={styles.bodyText}>
                  Stuff that you post on Badlee for others to view and share
                  shall be your own and posting other’s things and items is not
                  allowed and hence the security of such article posted is at
                  your own risk and responsibility.
                </Text>
                <Text style={styles.bodyText}>
                  The stuff that you lend to other users/members is at your risk
                  and Badlee is not responsible for the loss of the same or any
                  damage caused to it. Badlee has no method of tracking that
                  which user gives what article to whom. Therefore, be aware,
                  the security of your articles and stuff is at your hand. As a
                  suggestion, please do not give articles of stuff to those who
                  are strangers, please share your stuff with only those who you
                  trust and know personally.
                </Text>
                <Text style={styles.header2}>Third Party Advertising</Text>
                <Text style={styles.bodyText}>
                  You will see advertising material submitted by third parties
                  on Badlee. Each individual advertiser is solely responsible
                  for the content of its advertising material. We accept no
                  responsibility for the content of advertising material,
                  including, without limitation, any error, omission or
                  inaccuracy therein.You will see advertising material submitted
                  by third parties on Badlee Site. Each individual advertiser is
                  solely responsible for the content of its advertising
                  material. We accept no responsibility for the content of
                  advertising material, including, without limitation, any
                  error, omission or inaccuracy therein.
                </Text>
                <Text style={styles.header2}>
                  Changes to Terms and Conditions
                </Text>
                <Text style={styles.bodyText}>
                  Please note that we may change these terms and conditions from
                  time to time at our sole discretion and we reserve the right
                  to do without your consent. Any revised terms and conditions
                  will be applicable at the time of posting on Badlee. Please
                  ensure that you review these terms and conditions regularly as
                  you will be deemed to have accepted a variation if you
                  continue to use Badlee after it has been posted. You may find
                  the Terms and Conditions in the application any time you want.
                </Text>
                <Text style={styles.header2}>No Waiver</Text>
                <Text style={styles.bodyText}>
                  Our failure to insist upon or enforce any provision of these
                  terms of service shall not be construed as a waiver of any
                  provision or right of Badlee.
                </Text>
              </View>
            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

var styles = {
  header1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6
  },
  bodyText: {
    fontSize: 15,
    paddingLeft: 6
  },
  header2: {
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
    fontSize: 18
  },
  header3: {
    fontWeight: "bold",
    marginTop: 3,
    marginBottom: 3
  },
  ulList: {
    paddingLeft: 18,
    marginTop: 3
  },
  nestedUlList: {
    paddingLeft: 27,
    marginTop: 3
  }
};

const _Wrapped = connect(
  state => ({
    loading: state.getIn(["application", "isLoading"])
  }),
  actionCreators
)(TnC);

export default _Wrapped;
