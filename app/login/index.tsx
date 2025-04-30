import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../services/api/axiosInstance";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../services/type";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../services/redux/slices/authSlice";
import { useRouter } from "expo-router";
import Loader from "../../components/Loader";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Handle login using Formik values
  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Call your API to login here
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        dispatch(loginSuccess(response.data.token));
        // navigation.navigate("Home");
        router.push("/");
      }
    } catch (error) {
      // console.error(error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/main-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Medical Store App!</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              style={[
                styles.input,
                touched.password && errors.password ? styles.inputError : null,
              ]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <Loader visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    height: 50,
    width: "100%",
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
